const mongoose = require('mongoose')

const orderSchema=mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
          },
          orderStatus:{
            type: String,
            enum: ['Prêt à envoyer', 'Livré', 'retour','Envoyé'],
            required: true,
           },
          shippingAddress: {
            type: String,
            required: true,
          },
          shippingCity: {
            type: String,
            required: true,
          },
          orderDate:
          {
            type: Date,
            default: Date.now,
          },
          total: {
            type: Number,
            default: 0,
          },
          products: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'product',
            },
          ],



    },
    { timestamps: true }



)
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






const Order=mongoose.model('order',orderSchema)
module.exports = Order