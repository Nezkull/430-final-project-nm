const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

/*
const userPage = (req, res) => {
  res.render('userAccount');
};
*/

// this is useless
/*
const userAccount = (request, response) => {
  const req = request;
  const res = response;

  req.session.account = Account.AccountModel.toAPI(account);

  return res.json({ redirect: '/userAccount' });
};
*/

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields  are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

/*
const changePassword = (request, response) => {
  const req = request;
  const res = response;

  req.body.pass = `${req.body.pass}`;
  req.body.newPass1 = `${req.body.newPass1}`;
  req.body.newPass2 = `${req.body.newPass2}`;

  if (!req.body.pass || !req.body.newPass1 || !req.body.newPass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.newPass1 !== req.body.newPass2) {
    return res.status(400).json({ error: 'New passwords do not match' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    return Account.AccountModel.generateHash(req.body.newPass1, (salt, hash) => {
    // look into findOneAndUpdate or updateOne more for this I think
    // don't ned to make a new one entirely
      const updatedAccount = account;
      updatedAccount.salt = salt;
      updatedAccount.password = hash;

      const updatedPromise = updatedAccount.save();

      updatedPromise.then(() => {
          req.session.account = Account.AccountModel.toAPI(updatedAccount);
            return res.json({ redirect: '/maker' });
      });

      updatedPromise.catch((err) => {
          if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
      });
  });
});
*/

// maybe make a getAccount function, it kinda works but at the same time not really for some reason
const getAccount = (request, response) => {
    const req = request;
    const res = response;
    
    const accountJSON = {
        username: req.session.account.username,
        id: req.session.account._id,
    };
    
    res.json(accountJSON);
   
    
    // const tempAccount = { Account.AccountModel.findByUsername(req.session.account.username) };
    
   //  res.json(tempAccount);
};


const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.getAccount = getAccount;
// module.exports.userAccount = userAccount;
// module.exports.userPage = userPage;
// module.exports.changePassword = changePassword;
