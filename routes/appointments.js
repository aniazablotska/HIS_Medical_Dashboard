const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Тільки імпорт!

router.get('/', async (req, res) => {
    try {
        const list = await Appointment.find().sort({ _id: -1 });
        res.json(list);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const a = new Appointment(req.body);
        await a.save();
        res.status(201).json(a);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.patch('/:id', async (req, res) => {
    try {
        const a = await Appointment.findById(req.params.id);
        if (a) {
            a.status = req.body.status; 
            await a.save();
        }
        res.json(a);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;