const Authentication = require('./controllers/authentication');
const Messages = require('./controllers/messages');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/message', requireAuth, Messages.getMessagesHeaders);
  app.post('/message', requireAuth, Messages.sendMessage);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
