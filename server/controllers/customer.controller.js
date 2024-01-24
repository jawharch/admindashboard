
const Customer = require('../models/customer.model');
const Order = require('../models/order.model');


exports.createCustomer = async (req, res,next) => {
  try {
    const { firstName, lastName, badge, phoneNumber, address, city } = req.body;
    const newCustomer = new Customer({
      firstName,
      lastName,
      badge,
      phoneNumber,
      address,
      city,
    });
    const savedCustomer = await newCustomer.save();
    res.status(201).json('Nouveau client crée');
  }  catch (error) {
    next()
   }
};


exports.getAllCustomers = async (req, res,next) => {
  try {
    const customers = await Customer.find().populate('orders')
    res.status(200).json(customers);
  }  catch (error) {
    next()
   }
};


exports.getCustomerById = async (req, res,next) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId).populate('orders')
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  }  catch (error) {
    next()
   }
};


exports.updateCustomerById = async (req, res,next) => {
  try {
    const customerId = req.params.id;
    const { firstName, lastName, badge, phoneNumber, address, city } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      {
        firstName,
        lastName,
        badge,
        phoneNumber,
        address,
        city,
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  }  catch (error) {
    next()
   }
};


exports.deleteCustomerById = async (req, res, next) => {
    try {
      const customerId = req.params.id;
  
      
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
  
      if (!deletedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      
      await Order.deleteMany({ customer: customerId });
  
      res.status(200).json('Client supprimé avec ses commandes associées');
    } catch (error) {
      next(error);
    }
  };
