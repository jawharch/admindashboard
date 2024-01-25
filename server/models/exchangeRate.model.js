const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
    fromCurrency: String,
    toCurrency: String,
    rate: Number,
    lastUpdated: Date,
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
