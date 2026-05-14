const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dob: String,
    city: String,
    status: { type: String, default: "Очікує" }
});

module.exports = mongoose.model('Patient', PatientSchema);