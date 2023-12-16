const express = require('express');
const router = express.Router();
const { createUserControllers, loginUserControllers } = require('../Controllers/AuthControllers');

//REGISTER
router.post("/createuser", createUserControllers);

//LOGIN
router.post("/loginuser", loginUserControllers);

module.exports = router;