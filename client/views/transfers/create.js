Template.transfersCreate.onCreated(function() {
  Session.set('currentTransfer', null);
  var self = this;
  self.subscribe('myAccounts');
  self.subscribe('myCards');
  self.autorun(function() {
    Session.get('currentTransfer') && self.subscribe('transfer', Session.get('currentTransfer'));
  });
});

Template.transfersCreate.onRendered(function() {
  Session.set('currentTransfer', null);
});

Template.transfersCreate.helpers({
  cards: function() {
    return Cards.find({ ownerId: Meteor.userId() });
  },
  accounts: function() {
    return Accounts.find({ ownerId: Meteor.userId() });
  },
  transfer: function() {
    return Transfers.findOne({ _id: Session.get('currentTransfer') });
  },
  upper: function(string){
  return string.toUpperCase();
  }
});

Template.transfersCreate.events({
  'keyup [name=change-peso]': function(event, template) {
    var value = $(event.currentTarget).val();
    var dolars = value / dolarPrice;
    if (dolars > 0) {
      dolars = Math.round(dolars * 100) * 0.01;
      template.$('[name=change-dolar]').val(dolars).closest('.input-field').find('label').addClass('active');
    } else {
      template.$('[name=change-dolar]').val('').closest('.input-field').find('label').removeClass('active');
    }
  },
  'keyup [name=change-dolar]': function(event, template) {
    var value = $(event.currentTarget).val();
    var pesos = value * dolarPrice;
    if (pesos > 0) {
      pesos = Math.round(pesos);
      template.$('[name=change-peso]').val(pesos).closest('.input-field').find('label').addClass('active');
    } else {
      template.$('[name=change-peso]').val('').closest('.input-field').find('label').removeClass('active');
    }
  },
  'click .confirm-btn': function(event, template) {
    var doc = {
      amount: template.$('[name=change-dolar]').val() * 100,
      cardId: template.$('[name=card]:checked').val(),
      accountId: template.$('[name=account]:checked').val()
    }
    Transfers.insert(doc, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        //Session.set('currentTransfer', response);
        FlowRouter.go('transfers.show', { transferId: response });
      }
    });
  }
})
