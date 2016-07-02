Template.accountsIndex.onCreated(function() {
  this.subscribe('myAccounts');
});

Template.accountsIndex.helpers({
  accounts: function() {
    return Accounts.find({ ownerId: Meteor.userId() });
  }
});

Template.accountsIndex.events({
  'click .pass-btn': function(event, template) {
    var dataContext={
	  message:"You must see this, it's amazing !",
	  url:"http://myapp.com/content/amazingstuff",
	  title:"Amazing stuff, click me !"
	};
	var html=Blaze.toHTMLWithData(Template.shareEmailContent,dataContext);
	var options={
	  from:"c.ojeda@cloudview.cl",
	  to:"crijeda@gmail.com",
	  subject:"I want to share this with you !",
	  html:html
	  };
	
	Meteor.call("sendShareEmail",options);
	}
});