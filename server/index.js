const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieparser = require('cookie-parser')

const customerRouter = require('./routes/customer.route')
const orderRouter = require('./routes/order.route')
const productRouter = require('./routes/product.route')
const exchangeRateRoutes = require('./routes/exchangeRate.route');
dotenv.config()
const uri = process.env.MONGO
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
const app=express()
app.use(express.urlencoded({
    extended:true
}))
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());

// Prefix routes with /api
app.use('/api',customerRouter);
app.use('/api',orderRouter);
app.use('/api',productRouter);
app.use('/api', exchangeRateRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
