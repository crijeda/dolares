Meteor.users.after.insert(function() {
  stripeSyncUsers();
});
