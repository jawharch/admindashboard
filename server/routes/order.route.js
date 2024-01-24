const express=require('express')
const {createOrder,getAllOrders,getOrderById,updateOrderById,deleteOrderById}=require('../controllers/order.controller')
const router=express.Router();
router.post('/create',createOrder)
router.get('/getAll',getAllOrders)
router.get('/get/:id',getOrderById)
router.put('/update/:id',updateOrderById)
router.delete('/delete/:id',deleteOrderById)

module.exports = router