Meteor.publish('myCards', function() {
  return Cards.find({ ownerId: this.userId }, { fields: { last4: 1, brand: 1, ownerId: 1 } });
});
