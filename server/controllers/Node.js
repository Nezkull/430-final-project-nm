const models = require('../models');

const { Node } = models;

const makerPage = (req, res) => {
  Node.NodeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), accounts: docs });
  });
};

const makeNode = (req, res) => {
  if (!req.body.name || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'Account name, Username, and Password are required.' });
  }

  const nodeData = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    image: req.body.image,
    owner: req.session.account._id,
  };

  const newNode = new Node.NodeModel(nodeData);

  const nodePromise = newNode.save();

  nodePromise.then(() => res.json({ redirect: '/maker' }));

  nodePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Account already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return nodePromise;
};

const getNodes = (request, response) => {
  const req = request;
  const res = response;

  return Node.NodeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ accounts: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getNodes = getNodes;
module.exports.make = makeNode;
