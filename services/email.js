const config = require('../config');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(
  'smtps://' +  config.emailAccount + ':' + config.emailPassword + '@' + config.smtpServer);

// setup e-mail data with unicode symbols
const mailOptions = {
    from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
    to: 'lizarralde.ignacio@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object

module.exports.send = function (mailOptions) {
  return transporter.sendMail(mailOptions, function(error, info){
      if(error){ return error; }
      return info.response;
  });
};
