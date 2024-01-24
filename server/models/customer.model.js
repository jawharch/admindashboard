const mongoose = require('mongoose')
const Order = require('./order.model')
const customerSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true

        },
        lastName:{
            type:String,
            required:true

    },
        badge: {
        type: String,
        enum: ['Gold', 'Silver', 'Bronze'],
        required: true,
         },
         orders: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
},],
      phoneNumber:{
        type:Number,
        required:true
      },
      address:{
        type:String,
        required:true
      },
      city:{
        type:String,
        required:true
      },
      total:{
        type:Number,
        default:0
      }
    },
    { timestamps: true }



)
//total calucation for customers
customerSchema.post('save', async function (doc) {
  try {
    console.log(doc)
    console.log('Calculating Total for Customer:', doc._id);
    

    const customerWithOrders = await doc.model('Customer').findById(doc._id).populate('orders')
    console.log(customerWithOrders)
    

    const currentTotal = doc.total || 0;
    
    const calculatedTotal = customerWithOrders.orders.reduce(
      (total, order) => total + order.total,
      0
    );

    console.log('Current Total:', currentTotal);
    console.log('Calculated Total:', calculatedTotal);

    
    if (!isNaN(calculatedTotal)) {
      if (currentTotal !== calculatedTotal) {
        console.log('Updating Total:', calculatedTotal);
        doc.total = calculatedTotal;
        await doc.save();
      } else {
        console.log('Total is up to date. No need to update.');
      }
    } else {
      console.error('Calculated total is NaN. Check your calculation logic.');
    }
  } catch (error) {
    console.error('Error calculating total:', error);
  }
});



//remove order from customer
 customerSchema.pre('remove',function(next){
    this.orders.forEach(order=>{
        Order.findByIdAndDelete(order)
    })
    next()
})

const Customer=mongoose.model('Customer',customerSchema)
module.exports = Customer