const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');


router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find().sort({ _id: -1 }); 
        res.json(patients);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const p = new Patient(req.body);
        await p.save();
        res.status(201).json(p);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.patch('/:id', async (req, res) => {
    try {
        const p = await Patient.findById(req.params.id);
        if (p) { 
            p.status = req.body.status || "Прийнято"; 
            await p.save(); 
        }
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Пацієнта видалено" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;