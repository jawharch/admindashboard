const express = require('express');
const router = express.Router();
const exchangeRateController = require('../controllers/exchangeRate.controller');

router.post('/update-exchange-rates', exchangeRateController.updateExchangeRates);

module.exports = router;
