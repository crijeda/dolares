Meteor.methods({
  emailPassword: function(userId,email) {
    try {
      console.log(userId)
      console.log(email)
      Accounts.sendResetPasswordEmail(userId,email);
    } catch (e) {
      console.log(e);
    }
    
  }

});
