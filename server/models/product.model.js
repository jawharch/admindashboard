const mongoose = require('mongoose');
const ExchangeRate = require('./exchangeRate.model');
const {CurrencyEnum} = require("../shared/constants");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    basePrice: {
        type: Number,
        required: true,
        value: Number,
        currency: {
            type: String,
            enum: CurrencyEnum,
            default:'EUR'
        }
    },
    sellPrice: {
        type: Number,
        required: true,
        value: Number,
        currency: {
            type: String,
            enum: CurrencyEnum,
            default:'TND'
        }
    }
},
{
    timestamps: true 
}
);

// Calculate exchange rate for base and sell prices
productSchema.pre('save', async function (next) {
    try {
        const convertPrice = async (price) => {
            if (CurrencyEnum.includes(price.currency)) {
                const exchangeRate = await ExchangeRate.findOne({ fromCurrency: price.currency, toCurrency: price.currency === 'EUR' ? 'TND' : 'EUR' });
                if (exchangeRate) {
                    price.value *= exchangeRate.rate;
                    price.currency = price.currency === 'EUR' ? 'TND' : 'EUR';
                }
            }
        };

        await convertPrice(this.basePrice);
        await convertPrice(this.sellPrice);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Product', productSchema);
