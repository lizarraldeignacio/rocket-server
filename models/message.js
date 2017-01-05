const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: String
});

const model = mongoose.model('message', messageSchema);

module.exports = model;
