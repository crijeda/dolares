// dolarPrice = HTTP.get('http://mindicador.cl/api/dolar', {timeout:5000}).data.serie[0].valor;

dolarPrice = 500;

if (Meteor.isClient) {

  Template.registerHelper('dolarPrice', function() {

	        return dolarPrice;
  });
}
