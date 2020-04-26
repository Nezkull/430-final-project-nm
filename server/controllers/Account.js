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

// change password code

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  // i guess i cna get away with only haveing one new password value, if i do the username check,
  // it might allow someone to change someone elses password, maybe?
  // req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.newPass1 = `${req.body.newPass1}`;

  if (!req.body.pass || !req.body.newPass1) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(req.session.account.username,
    req.body.pass, (err, account) => {
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
          // the return line ill need to be changed later to redirect back to the profile page
          return res.json({ redirect: '/maker' });
        });

        updatedPromise.catch(() => res.status(400).json({ error: 'Something went wrong.' }));
      });
    });
};

// premium account upgrade code
/*
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

  // return res.status(400).json({ error: ' An error occurred'});
};
*/

// maybe make a getAccount function, it kinda works but at the same time not really for some reason
const getAccount = (request, response) => {
  const req = request;
  const res = response;

  Account.AccountModel.findByUsername(req.session.account.username).then((account) => {
    const accountInfo = {
      username: account.username,
      id: account._id,
      password: account.password,
      premiumMem: account.premiumMem,
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
module.exports.changePassword = changePassword;
// module.exports.premiumMember = premiumMember;
// module.exports.userAccount = userAccount;
// module.exports.userPage = userPage;
