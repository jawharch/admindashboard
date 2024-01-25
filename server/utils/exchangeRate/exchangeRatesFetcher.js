const axios = require('axios');
const {AXIOS_API_KEY} = require('../../shared/constants')

const fetchExchangeRates = async () => {
    try {
        const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${AXIOS_API_KEY}`);
        const allExchangeRates = response.data.rates;
        const eurExchangeRate = allExchangeRates.EUR;

        // Return only the exchange rate for EUR
        return { EUR: eurExchangeRate };
    } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
        throw error;
    }
};

module.exports = fetchExchangeRates;
