const ExchangeRate = require('../models/exchangeRate.model');
const axios = require('axios');
const {AXIOS_API_KEY} = require("../shared/constants");

const updateExchangeRates = async (req, res) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${AXIOS_API_KEY}/latest/EUR`);
        const allExchangeRates = response.data
        
        const tndExchangeRate = {TND: allExchangeRates.conversion_rates.TND};
         console.log(tndExchangeRate)


        // Update exchange rates in the database
        await ExchangeRate.deleteMany({}); // Clear existing rates
        const a=await ExchangeRate.insertMany(Object.entries(tndExchangeRate).map(([currency, rate]) => ({
            fromCurrency: 'EUR',
            toCurrency: currency,
            rate,
            lastUpdated: new Date(),
        })));

        res.status(200).json(a);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update exchange rates' });
    }
};

module.exports = {
    updateExchangeRates,
};
