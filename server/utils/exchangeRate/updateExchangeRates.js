const mongoose = require('mongoose');
const ExchangeRate = require('../../models/exchangeRate.model'); // Adjust the path accordingly
const fetchExchangeRates = require('./exchangeRatesFetcher'); // Adjust the path accordingly

const updateExchangeRates = async () => {
    try {
        const exchangeRates = await fetchExchangeRates();
        console.log('DEBUUUUG exchange rates', Object.entries(exchangeRates));

        const options = { ordered: false, timeout: 30000 }; // Adjust the timeout as needed

        // Update exchange rates in the database
        await ExchangeRate.deleteMany({});
        await ExchangeRate.insertMany(Object.entries(exchangeRates).map(([currency, rate]) => ({
            fromCurrency: 'USD',
            toCurrency: currency,
            rate,
            lastUpdated: new Date(),
        })), options);

        console.log('Exchange rates updated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Failed to update exchange rates:', error.message);
        process.exit(1);
    }
};

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

updateExchangeRates();
