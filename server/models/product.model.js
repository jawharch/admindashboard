const mongoose = require('mongoose')

const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true},
       
        img:
        {
            type:String,
            required:true
        },
        size:
        {
            type:String,
            required:true
            
        },
        basedPrice:
        {
            type:Number,
            required:true
        }
        ,
        sellPrice:
        {
            type:Number,
            required:true
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
          },
          convertedBasedPrice: {
            type: Number,
            required:true
            
        


       

    },
},
    { timestamps: true }



)




const Product=mongoose.model('product',productSchema)
module.exports = Product