const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dmoneySchema = new Schema({
    sendto: String,
    sendername : String,
    senderId : String,
    amount: String,
});

module.exports = mongoose.model('dmoney', dmoneySchema, 'dmoney');