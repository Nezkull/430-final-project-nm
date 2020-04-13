const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let NodeModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const NodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },
  // storing images in mongo would mean having to convert back and forth to binary,
  // just use string path and change img src for now
  image: {
    type: String,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

NodeSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  username: doc.username,
  password: doc.password,
  email: doc.email,
  image: doc.image,
});

NodeSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return NodeModel.find(search).select('name username password email image').lean().exec(callback);
};

NodeModel = mongoose.model('Node', NodeSchema);

module.exports.NodeModel = NodeModel;
module.exports.NodeSchema = NodeSchema;
