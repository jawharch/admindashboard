const express=require('express')
const { createCustomer,getAllCustomers,getCustomerById,deleteCustomerById,updateCustomerById } =require('../controllers/customer.controller') 
const router=express.Router();
router.post('/create',createCustomer)
router.get('/getAll',getAllCustomers)
router.get('/get/:id',getCustomerById)
router.put('/update/:id',updateCustomerById)
router.delete('/delete/:id',deleteCustomerById)

module.exports = router