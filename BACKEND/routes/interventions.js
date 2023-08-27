const express = require('express');
const router = express.Router();
const Intervention = require('../models/totalDB');

router.get('/', async (req, res) => {
    try {
        const interventions = await Intervention.find();
        res.json(interventions);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des interventions.' });
    }
});

module.exports = router;
