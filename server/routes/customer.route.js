const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:customerId', customerController.getCustomerById);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:customerId', customerController.updateCustomer);
router.delete('/customers/:customerId', customerController.deleteCustomer);
router.get('/customers/getAllCustomersWithOrders', customerController.getAllCustomersWithOrders);

module.exports = router;
