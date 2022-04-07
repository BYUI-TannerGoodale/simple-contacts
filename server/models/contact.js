const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String
});

module.exports = mongoose.model("Contact", contactSchema);
