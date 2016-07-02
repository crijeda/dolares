Meteor.startup(function() {
  Transfers.before.insert(function(userId, doc) {
    var card = Cards.findOne({ ownerId: doc.ownerId, _id: doc.cardId });
    if (!card) return false;

    var user = Meteor.users.findOne({ _id: doc.ownerId });
    if (!user.services.stripe || !user.services.stripe.id) return false;

    var charge = stripe.charges.create({
      amount: doc.amount,
      currency: 'usd',
      source: card.id,
      customer: user.services.stripe.id,
      description: '#' + doc._id
    });

    doc.charge = charge;
    console.log(charge);
  });
});
