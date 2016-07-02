Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        var rol = Meteor.user().roles;
        Router.go('home');
    },

});