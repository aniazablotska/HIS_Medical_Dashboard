const mongoose = require('mongoose');
module.exports = mongoose.model('Doctor', new mongoose.Schema({
    name: String, specialization: String, experience: Number, room: String, schedule: String
}));