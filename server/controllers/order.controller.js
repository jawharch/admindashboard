const Order = require('../models/order.model');
const Customer = require('../models/customer.model');


exports.createOrder = async (req, res, next) => {
  try {
    const { orderStatus, shippingAddress, shippingCity, customerFullName } = req.body;

    
    const [firstName, lastName] = customerFullName.split(' ');
    const existingCustomer = await Customer.findOne({ firstName, lastName });

    if (!existingCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    
    const newOrder = new Order({
      customer: existingCustomer._id,
      orderStatus,
      shippingAddress,
      shippingCity,
      
      
    });

    const savedOrder = await newOrder.save();

    
    existingCustomer.orders.push(savedOrder._id);
    await existingCustomer.save();
  

    res.status(201).json('Commande créee');
  } catch (error) {
    next(error);
  }
};


exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('customer', 'firstName lastName').populate({path:'products', select: '-__v -createdAt -updatedAt'})
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}
exports.getOrderById = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId).populate('customer', 'firstName lastName').populate({path:'products', select: '-__v -createdAt -updatedAt'})
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  exports.updateOrderById = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const { orderStatus, shippingAddress, shippingCity, products} = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          orderStatus,
          shippingAddress,
          shippingCity,
          products,
          
        },
        { new: true }
      ).populate('customer','firstName lastName')
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  };
  
  
  exports.deleteOrderById = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);
  
      
      if (deletedOrder) {
        const customer = await Customer.findById(deletedOrder.customer);
        if (customer) {
          customer.orders.pull(orderId);
          await customer.save();
        }
  
        res.status(200).json('Commande supprimée');
      } else {
        res.status(404).json({ error: 'Commande non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };



