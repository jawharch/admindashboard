const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const mongoose=require('mongoose');
const getAllCustomers = async (req, res) => {
    try {
        
        
        const customerWithOrders = await Customer.aggregate([
           
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'orders',
                },

            },
            {
                $addFields:{
                    ordersNumber: {
                        $size: '$orders'
                    }
                }
            },
            {
                $project:{
                    
                    orders:0,
                    
                }
            }
        ]);
        res.status(200).json(customerWithOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        const customerWithOrders = await Customer.aggregate([
            {
                $match: {
                    _id: new  mongoose.Types.ObjectId(customerId),
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'orders',
                },
            },
        ]);

        
        if (customerWithOrders.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json(customerWithOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, badge, phoneNumber, address, city, postalCode } = req.body;

        // Validators
        // Validate if required fields are present
        if (!firstName || !lastName || !badge || !phoneNumber || !address || !city || !postalCode) {
            return res.status(400).json({ error: 'Incomplete data provided for customer creation' });
        }

        const newCustomer = new Customer({
            firstName,
            lastName,
            badge,
            phoneNumber,
            address,
            city,
            postalCode,
            
        });

        const savedCustomer = await newCustomer.save();
        // const newCustomerWithOrders = await Customer.aggregate([
        //     {
        //         $match: {
        //             _id: new  mongoose.Types.ObjectId(savedCustomer._id),
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: 'orders',
        //             localField: '_id',
        //             foreignField: 'customer',
        //             as: 'orders',
        //         },
        //     },
        //     {
        //         $addFields:{
        //             ordersNumber: {
        //                 $size: '$orders'
        //             }
        //         }
        //     },
        //     {
        //         $project:{
                    
        //             orders:0,
                    
        //         }
        //     }
        // ]);
        
const savedCustomerDto={...savedCustomer._doc,ordersNumber:0};

        res.status(201).json(savedCustomerDto);


        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const updateData = req.body;

        // Validators
        // Validate if customer exists
        const isValidCustomerId = mongoose.Types.ObjectId.isValid(customerId);
        if (!isValidCustomerId) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        // Validate if the update data is present
        if (!updateData) {
            return res.status(400).json({ error: 'No update data provided' });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updateData, { new: true });

        // Check if the customer is found and updated
        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        // Validators
        // Validate if customer exists
        const isValidCustomerId = mongoose.Types.ObjectId.isValid(customerId);
        if (!isValidCustomerId) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        // Check if the product is found and deleted
        if (!deletedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  
};
