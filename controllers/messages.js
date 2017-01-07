const User = require('../models/user');
const Message = require('../models/message');
const Email = require('../services/email');

module.exports.getMessagesHeaders = function(req, res) {
  const token = req.header.authorization;

  var messages = null;

  switch (req.query.type) {
    case 'sent':
      messages = req.user.sent
      break;
    case 'received':
      messages = req.user.received
      break;
  }

  return res.status(200)
    .send({
      messages: messages
    });
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

  console.log(req.user);

  message.save(function(err, message) {
    if (err) { return next(err); }

    const messageHeader = {
      subject: subject,
      to: to,
      from: from,
      timestamp: timestamp,
      content_id: message._id
    };

    const user = req.user;

    user.sent.push(messageHeader);

    console.log(user);

    user.update({$push: {"sent": messageHeader}},
    {safe: true, upsert: true}, function(err) {
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
