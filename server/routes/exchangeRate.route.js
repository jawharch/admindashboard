const express = require('express');
const router = express.Router();
const exchangeRateController = require('../controllers/exchangeRate.controller');

router.get('/get-exchange-rates', exchangeRateController.getExchangeRates);

module.exports = router;
