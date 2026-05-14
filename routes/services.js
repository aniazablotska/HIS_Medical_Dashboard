const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Тільки імпорт!

router.get('/', async (req, res) => {
    try {
        const s = await Service.find();
        res.json(s);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const s = new Service(req.body);
        await s.save();
        res.status(201).json(s);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;