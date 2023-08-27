const express = require('express');
const router = express.Router();
const SurgeonRank = require('../controllers/interventionsController')

router.get('/', async (req, res) => {
    try {
        const start = req.query.start;
        const end = req.query.end;
        console.log("start : " , start, "end : ", end);
        const surgeonRank = await SurgeonRank.find().skip(start).limit(end);
        res.json(surgeonRank);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des surgeons.' });
    }
});

module.exports = router;
