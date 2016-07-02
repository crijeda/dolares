Template.cardsRemove.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('myCards');
  });
});

Template.cardsRemove.helpers({
  card: function() {
    return Cards.findOne({ _id: FlowRouter.getParam('cardId'), ownerId: Meteor.userId() });
  }
});

Template.cardsRemove.events({
  'click .delete-btn': function(event, template) {
    var card = Cards.findOne({ _id: FlowRouter.getParam('cardId'), ownerId: Meteor.userId() });
    // console.log(card._id)
    // console.log(card.id)
    Meteor.call('removeCard', card._id);
    // Cards.remove({ _id: FlowRouter.getParam('cardId') });  
    // stripe.customers.deleteCard(card.customer,card.id );

    FlowRouter.go('cards.index');
  }
});
