Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://c.ojeda@cloudview.cl:c.ojeda.2015@blue37.dnsmisitio.net:465';
});

Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },
  // WelcomeEmail: function (to) {
  //   check([to], [String]);

  //   // Let other method calls from the same client start running,
  //   // without waiting for the email sending to complete.
  //   this.unblock();
  //   var data = {name: "John"};
  //   var html = Blaze.toHTML(Blaze.With(data, function() { return Template.email_welcome; }));
  //   Email.send({
  //     to: 'crijeda@gmail.com',
  //     from: 'c.ojeda@cloudview.cl',
  //     subject: 'Bienvenido a Dolares',
  //     html:html
  //     // text: 'Aqui debería ir el texto de bienvenida con un HTML correspondiente'
  //   });
  // },
   sendShareEmail:function(options){
    // you should probably validate options using check before actually
    // sending email
    // check(options,{
    //   from:String,
    //   // etc...
    // });
    Email.send(options);
  }
});
