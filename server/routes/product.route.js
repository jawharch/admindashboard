const express=require('express')
const {createProduct}=require('../controllers/product.controller')
const router=express.Router();
router.post('/create/:id',createProduct)


module.exports = router