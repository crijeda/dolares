Meteor.methods({
  attachCard: function(token) {
    check(token, String);
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (!user) {
      throw new Meteor.Error('unauthorized', 'The user was not found');
    }

    if (!user.services.stripe) {
      stripeSyncUsers();
      user = Meteor.users.findOne({ _id: Meteor.userId() });
    }

    if (!user.services.stripe || !user.services.stripe.id) {
      throw new Meteor.Error('stripe-error', 'Error with provider');
    }

    try {
      var card = stripe.customers.createCard(user.services.stripe.id, { source: token });
      card.ownerId = Meteor.userId();
      return Cards.insert(card);
    } catch (e) {
      console.log(e);
    }
  },
   removeCard: function(cardId) {
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (!user) {
      throw new Meteor.Error('unauthorized', 'The user was not found');
    }

    if (!user.services.stripe) {
      stripeSyncUsers();
      user = Meteor.users.findOne({ _id: Meteor.userId() });
    }

    if (!user.services.stripe || !user.services.stripe.id) {
      throw new Meteor.Error('stripe-error', 'Error with provider');
    }
    var card = Cards.findOne({ _id: cardId, ownerId: Meteor.userId() });
    console.log(card.id)
    try {
      stripe.customers.deleteCard(user.services.stripe.id,card.id);
      Cards.remove({_id:card._id});
    } catch (e) {
      console.log(e);
    }
  }

});
