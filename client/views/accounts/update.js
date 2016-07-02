Template.accountsUpdate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var accountId = FlowRouter.getParam('accountId');
    self.subscribe('account', accountId);
  });
});

Template.accountsUpdate.helpers({
  account: function() {
    return Accounts.findOne({ _id: FlowRouter.getParam('accountId'), ownerId: Meteor.userId() });
  }
})
