Template.cardsIndex.onCreated(function() {
  this.subscribe('myCards');
});

Template.cardsIndex.helpers({
  cards: function() {
    return Cards.find({ ownerId: Meteor.userId() });
  }
});
