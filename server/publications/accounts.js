Meteor.publish('myAccounts', function() {
  return Accounts.find({ ownerId: this.userId });
});

Meteor.publish('account', function(accountId) {
  check(accountId, String);
  return Accounts.find({ _id: accountId, ownerId: this.userId });
});
