Template.cardsCreate.onRendered(function() {
  Session.set('cardsCreate_error', null);
})

Template.cardsCreate.events({
  'submit .create-card': function(event, template) {
    event.preventDefault();

    Stripe.card.createToken({
      number: template.$('[name=number]').val(),
      cvc: template.$('[name=cvc]').val(),
      exp_month: template.$('[name=month]').val(),
      exp_year: template.$('[name=year]').val()
    }, function(status, response) {
      if (response.error) {
        Session.set('cardsCreate_error', response.error.message);
      } else {
        Meteor.call('attachCard', response.id, function(error, response) {
          console.log(error, response);
        });
      }
    });
    FlowRouter.go('cards.index');
  }
});
