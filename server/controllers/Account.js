const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const profilePage = (req, res) => {
  Account.AccountModel.findByUsername(req.session.account.username, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'ERROR!' });
    }
    console.dir(req.session.account);
    console.log(docs);
    return res.render('profile', {
      csrfToken: req.csrfToken(),
      profile: req.session.account,
    });
  });
};

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

// change password code
const passwordChange = (request, response) => {
  const req = request;
  const res = response;

  req.body.oldPass = `${req.body.oldPass}`;
  req.body.newPass = `${req.body.newPass}`;

  console.log("Pass" + req.body.oldPass + " NewPass: " + req.body.newPass);
    
    
  if (!req.body.oldPass || !req.body.newPass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(req.session.account.username,
    req.body.oldPass, (err, account) => {
      if (err || !account) {
        return res.status(401).json({ error: 'Wrong username or password' });
      }

      return Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
        const updatedAccount = account;
          
          updatedAccount.hash = hash;
          /*
          username: req.session.account.username,
          salt,
          password: hash,
        */

        Account.AccountModel.collection.replaceOne(req.session.account.username, updatedAccount);

        console.log('Pass changed');

        res.status(200).json({ message: 'You have changed passwords' });
      });
    });
};

// not sure if i am going to go with this or go with ads instead
// premium account upgrade code
const premiumMember = (request, response) => {
  const req = request;
  const res = response;

  const userAccount = Account.AccountModel.findByUsername(req.session.account.username);

  userAccount.then((account) => {
    const updatedAccount = account;
    updatedAccount.premiumMem = true;
    updatedAccount.save();
  });

  userAccount.catch(() => res.status(400).json({ error: ' An error occurred' }));
};

const getAccount = (request, response) => {
  const req = request;
  const res = response;

  Account.AccountModel.findByUsername(req.session.account.username).then((account) => {
    const accountInfo = {
      username: account.username,
      id: account._id,
      password: account.password,
      premiumMem: account.premiumMem,
      createdDate: account.createdDate,
    };

    res.json(accountInfo);
  });
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
module.exports.passwordChange = passwordChange;
module.exports.profilePage = profilePage;
// module.exports.premiumMember = premiumMember;
