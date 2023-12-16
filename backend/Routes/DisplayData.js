const express = require('express');
const { displayDataControllers } = require('../Controllers/DisplayData');
const router = express.Router();

//DISPLAY DATA
router.post('/foodData', displayDataControllers);

module.exports = router;