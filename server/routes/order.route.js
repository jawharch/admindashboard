const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.delete('/orders/:orderId', orderController.deleteOrder);
router.put('/orders/:orderId', orderController.updateOrder);

module.exports = router;
