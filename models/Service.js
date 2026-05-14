const mongoose = require('mongoose');
module.exports = mongoose.model('Service', new mongoose.Schema({
    name: String, doctorName: String, price: String
}));