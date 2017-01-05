const User = require('../models/user');
const Message = require('../models/message');
const Email = require('../services/email');

module.exports.getMessagesHeaders = function(req, res) {
  const token = req.header.authorization;
  return res.status(200)
    .send({ messages: req.user.messages });
}

module.exports.sendMessage = function(req, res, next) {
  const subject = req.body.subject;
  const to = req.body.to;
  const from = req.body.from;
  const content = req.body.content;
  const timestamp = req.body.timestamp;

  if (!to || !from) {
    return next('"to" and "from" are mandatory fields');
  }

  const message = new Message({
    content: content
  });

  message.save(function(err, message) {
    if (err) { return next(err); }

    const messageHeader = {
      subject: subject,
      to: to,
      from: from,
      timestamp: timestamp,
      content_id: message._id
    };

    req.user.sent.push(messageHeader);

    req.user.save(function(err) {
      if (err) { return next(err); }
      /*const mailOptions = {
          from: from, // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          text: content, // plaintext body
          html: '' // html body
      };
      res.status(200).send(Email.send(mailOptions));*/
      res.status(200).send(messageHeader);
    });

  });

}
