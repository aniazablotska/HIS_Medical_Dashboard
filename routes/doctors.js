const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor'); // Тільки імпорт!

router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const d = new Doctor(req.body);
        await d.save();
        res.status(201).json(d);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;