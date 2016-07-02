stripe = new StripeKonnect('stripe');
stripe.configure({
  appName: 'Dolares',
  appLogo: 'http://mysite.com/assets/logo.png',
  apiKey: process.env.STRIPE_SECRET,
  publishableKey: process.env.STRIPE_PUBLISHABLE
});
