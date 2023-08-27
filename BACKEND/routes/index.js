const express = require('express');
const router = express.Router();
const interventionsRouter = require('./interventions');
const surgeonsRouter = require('./surgeon')


router.use('/interventions', interventionsRouter);

router.use('/surgeons', surgeonsRouter);

module.exports = router;