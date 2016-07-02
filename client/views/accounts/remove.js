Template.accountsRemove.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var accountId = FlowRouter.getParam('accountId');
    self.subscribe('account', accountId);
  });
});

Template.accountsRemove.helpers({
  account: function() {
    return Accounts.findOne({ _id: FlowRouter.getParam('accountId'), ownerId: Meteor.userId() });
  }
});

Template.accountsRemove.events({
  'click .delete-btn': function(event, template) {
    Accounts.remove({ _id: FlowRouter.getParam('accountId') });
    FlowRouter.go('accounts.index');
  }
});
