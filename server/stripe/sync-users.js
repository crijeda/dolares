stripeSyncUsers = function() {
  Meteor.users.find({ 'services.stripe': null }).forEach(function(user) {
    var customer = stripe.customers.create({
      email: user.emails[0].address,
      metadata: {
        userId: user._id
      }
    });

    Meteor.users.update({ _id: user._id }, { $set: { 'services.stripe': customer } });
  });
}
