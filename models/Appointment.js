const mongoose = require('mongoose');
module.exports = mongoose.model('Appointment', new mongoose.Schema({
    patientName: String, doctorName: String, service: String, price: String, date: String, status: { type: String, default: "Заплановано" }
}));