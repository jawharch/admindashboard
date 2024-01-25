const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Validators
        // Validate if the provided product ID is valid
        const isValidProductId = mongoose.Types.ObjectId.isValid(productId);
        if (!isValidProductId) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, sku, image, size, quantity, basePrice, sellPrice } = req.body;

        // Validators
        // Validate if required fields are present
        if (!name || !sku || !image || !size || !quantity || !basePrice || !sellPrice) {
            return res.status(400).json({ error: 'Incomplete data provided for product creation' });
        }

        const newProduct = new Product({
            name,
            sku,
            image,
            size,
            quantity,
            basePrice,
            sellPrice,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updateData = req.body;

        // Validators
        // Validate if the provided product ID is valid
        const isValidProductId = mongoose.Types.ObjectId.isValid(productId);
        if (!isValidProductId) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        // Validate if the update data is present
        if (!updateData) {
            return res.status(400).json({ error: 'No update data provided' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        // Check if the order is found and updated
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Validators
        // Validate if the provided product ID is valid
        const isValidProductId = mongoose.Types.ObjectId.isValid(productId);
        if (!isValidProductId) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);

        // Check if the product is found and deleted
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
