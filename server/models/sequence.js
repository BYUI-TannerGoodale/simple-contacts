const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  "maxContactId": Number
});

module.exports = mongoose.model("Sequence", sequenceSchema);
