const ExchangeRate = require('../models/exchangeRate.model');
const axios = require('axios');
const {AXIOS_API_KEY} = require("../shared/constants");

const updateExchangeRates = async (req, res) => {
    try {
        const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${AXIOS_API_KEY}`);
        const allExchangeRates = response.data.rates;
        const eurExchangeRate = allExchangeRates.EUR;

        // Update exchange rates in the database
        await ExchangeRate.deleteMany({}); // Clear existing rates
        await ExchangeRate.insertMany(await ExchangeRate.insertMany(Object.entries(eurExchangeRate).map(([currency, rate]) => ({
            fromCurrency: 'USD',
            toCurrency: currency,
            rate,
            lastUpdated: new Date(),
        }))));

        res.status(200).json({ message: 'Exchange rates updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update exchange rates' });
    }
};

module.exports = {
    updateExchangeRates,
};
