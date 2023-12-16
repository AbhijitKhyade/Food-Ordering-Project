const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const { orderDataControllers, myOrderDataControllers } = require('../Controllers/Orders');


//ORDER DATA
router.post('/orderData', orderDataControllers);

//MY ORDER DATA
router.post('/myorderData', myOrderDataControllers);


module.exports = router;
