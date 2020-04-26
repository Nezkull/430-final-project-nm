const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getAccount', mid.requiresSecure, mid.requiresLogin, controllers.Account.getAccount);
  app.get('/getNodes', mid.requiresLogin, controllers.Node.getNodes);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  // app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Node.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Node.make);
  // app.get('/userAccount', mid.requiresSecure, mid.requiresLogin, controllers.Account.userPage);
  // app.post('/changePassword', mid.requiresSecure, 
  //   mid.requiresLogin, controllers.Account.changePassword);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
