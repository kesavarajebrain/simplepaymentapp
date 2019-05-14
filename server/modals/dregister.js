const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dregisterSchema = new Schema({
    firstname: String,
    mobile: String,
});

module.exports = mongoose.model('dregister', dregisterSchema, 'dregister');