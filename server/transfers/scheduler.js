Meteor.methods({
  scheduleTransfer: function() {
    var transfer = Transfers.findAndModify({
      query: { status: 'pending' },
      update: { $set: { status: 'running' } },
      sort: { createdAt: 1 },
      new: true
    });

    if (!transfer) {
      Meteor._sleepForMs(1000);
      return;
    };

    try {
      console.log('making transfer', transfer._id);

      var amount = Math.round(transfer.amount * 0.01 * transfer.dolarPrice);
      var info = {
        bankId: transfer.account.bank,
        accountTypeId: transfer.account.type,
        rut: transfer.account.rut,
        name: transfer.account.name,
        amount: amount,
        account: transfer.account.number,
        transferId: transfer._id
      };
      var onProgress = function(progress, message) {
        Transfers.update(transfer._id, { $set: { progress: progress, progressMessage: message } });
      }
      var success = santanderMakeTransfer(info, onProgress);
      Transfers.update(transfer._id, { $set: { status: success ? 'success' : 'error' } });
    } catch (e) {
      console.log('Error making transfer', e);
      Transfers.update(transfer._id, { $set: { status: 'error' } });
      Meteor._sleepForMs(5000);
      throw e;
    }
  },
  refreshTransfers: function() {
    Transfers.update({ status: 'running' }, { $set: { status: 'pending' } });
  }
});

Meteor.startup(function () {
  process.env.MAKE_TRANSFERS == 'true' && Meteor.call('refreshTransfers');
  Meteor.defer(function() {
    while (process.env.MAKE_TRANSFERS == 'true') {
      try {
        Meteor.call('scheduleTransfer');
      } catch(e) {
        console.log('Error making transfer: ', e);
      }
      Meteor._sleepForMs(100 + _.random(300));
    }
  })
});
