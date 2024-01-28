const Order = require('../models/order.model');
const mongoose = require('mongoose')

const createOrder = async (req, res) => {
  try {
    const { products, orderStatus, orderDate, totalPrice, shippingAddress, customerId } = req.body;

    // Validators
    // Validate if required fields are present
    if (!products || !orderStatus || !orderDate || !totalPrice || !shippingAddress || !customerId ) {
      return res.status(400).json({ error: 'Incomplete data provided for order creation' });
    }

    // Validate if customer exists
    const isValidCustomerId = mongoose.Types.ObjectId.isValid(customerId);
    if (!isValidCustomerId) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }

    const newOrder = new Order({
      products,
      orderStatus,
      orderDate,
      totalPrice,
      shippingAddress,
      customer: customerId,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('products').exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Validators
    // Validate if the provided order ID is valid
    const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidOrderId) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const order = await Order.findById(orderId).populate('customer').populate('products').exec();

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Validators
    // Validate if the provided order ID is valid
    const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidOrderId) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    // Check if the order was found and deleted
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedData = req.body;

    // Validators
    // Validate if the provided order ID is valid
    const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidOrderId) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    // Validate if the update data is present
    if (!updatedData) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder
};
