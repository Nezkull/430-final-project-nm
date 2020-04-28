const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getAccount', mid.requiresSecure, mid.requiresLogin, controllers.Account.getAccount);
  app.get('/getNodes', mid.requiresLogin, controllers.Node.getNodes);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Node.makerPage);

  // change this to redirect to the accounts page after posting an account
  app.post('/maker', mid.requiresLogin, controllers.Node.make);
  app.get('/profile', mid.requiresLogin, controllers.Account.profilePage);
  app.post('/passwordChange', mid.requiresLogin, mid.requiresSecure, controllers.Account.passwordChange);
  app.get('/node', mid.requiresLogin, controllers.Node.nodePage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
