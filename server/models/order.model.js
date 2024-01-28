const mongoose = require('mongoose');
const {OrderStatusEnum, CurrencyEnum} = require("../shared/constants");
const ExchangeRate = require("./exchangeRate.model");

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  orderStatus: {
    type: OrderStatusEnum,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    
    value: Number,
    currency: {
      type: String,
      enum: CurrencyEnum,
      default:'EUR'
    }
  },
  shippingAddress: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);


orderSchema.post('save', async function (doc) {
  try {
    console.log('Calculating Total for Order:', doc._id);

    const orderWithProducts = await doc.model('order').findById(doc._id).populate('products');

    const currentTotal = doc.total || 0;
    const calculatedTotal = orderWithProducts.products.reduce(
      (total, product) => total + product.sellPrice,
      0
    );

    if (currentTotal !== calculatedTotal) {
      console.log('Updating Total:', calculatedTotal);
      doc.total = calculatedTotal;
      await doc.save();
    } else {
      console.log('Total is up to date. No need to update.');
    }
  } catch (error) {
    console.error('Error calculating total:', error);

  }
});

// Calculate exchange rate for total price
orderSchema.pre('save', async function (next) {
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
    

    await convertPrice(this.totalPrice);
    next();
  } catch (error) {
    next(error);
  }
});

  
