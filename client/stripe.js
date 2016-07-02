stripe = new StripeKonnect('stripe');

var loadStripe = function() {
  if(window.Stripe) {
    Stripe.setPublishableKey('pk_test_8DiqnExAXEaZycmngH0lG0QK');
  } else {
    Meteor.setTimeout(loadStripe, 100);
  }
}

loadStripe();
