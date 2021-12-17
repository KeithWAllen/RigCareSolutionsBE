const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  username: {type:String},
  password: {type:String},
  sessionID: {type:String},
  type: {type:String},
  createdAt: {type:Date}
});

const model = mongoose.model('users', schema);

module.exports = model
