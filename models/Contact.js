const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName:{ type: String, required:true},
    lastName:{ type: String, required:true},
    address: { type: String, required:true},
    phoneNumber:{ type: String, required:true, unique:true},
    emailAddress:{ type: String, required:true, unique:true},
});

module.exports = mongoose.model('Contact', contactSchema);