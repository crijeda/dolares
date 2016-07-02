Meteor.startup(function() {
  Transfers.before.insert(function(userId, doc) {
    var card = Cards.findOne({ ownerId: doc.ownerId, _id: doc.cardId });
    if (!card) return false;
    doc.card = card;

    var account = Accounts.findOne({ ownerId: doc.ownerId, _id: doc.accountId });
    if (!account) return false;
    doc.account = account;
  });
});
