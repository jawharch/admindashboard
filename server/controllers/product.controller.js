const Product = require('../models/product.model');
const Order = require('../models/order.model');

exports.createProduct = async (req, res, next) => {
    try {
        const { name,  size, basedPrice, sellPrice, img } = req.body;
        const orderId = req.params.id;
    
        const  convertedBasedPrice =basedPrice * 3.37; 
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        
    
        
        const newProduct = new Product({
          order: orderId,
          name,
          img,
          
          size,
          basedPrice,
          sellPrice,
          convertedBasedPrice
          
          
          
          
        });
       
        
    
       const savedProduct= await newProduct.save();
       
    
        
        order.products.push(newProduct._id);
        await order.save();
   
    
        res.status(201).json(savedProduct);
      } catch (error) {
        next(error);
      }
    

}
