const express = require('express');
const router = express.Router();
const interventionsRouter = require('./interventions');

router.use('/interventions', interventionsRouter);

module.exports = router;