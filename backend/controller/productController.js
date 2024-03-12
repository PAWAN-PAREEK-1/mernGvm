const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Vendor = require('../models/vendorModel');
const Product = require('../models/productModel');

const addProduct = asyncHandler(async (req,res)=>{

    try {

        const vendorId = req.user.id;
            console.log(vendorId)

        if (!vendorId) {
            return res.status(400).json({ message: 'Vendor ID is required in the header' });
        }


        const { productType, price, productName } = req.body;


        const user = await Vendor.findById(vendorId);


        if (!user) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        const newProduct = new Product({
            productName: productName,
            price: price,
            productType: productType,
            vendorId: vendorId,
        });


        await newProduct.save();


        res.status(200).json({ message: 'Product added successfully', data: newProduct });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error adding product' });
    }


})

const getAllproduct = asyncHandler(async (req,res)=>{
    try {


        const page = parseInt(req.query.page) || 1 ;
        const pageSize = parseInt(req.query.pageSize) || 3;

        const totalproduct = await Product.countDocuments();
        const totalPage =Math.ceil(totalproduct / pageSize);




        const products = await Product.find()
        .populate('vendorId')
        .skip((page - 1) * pageSize)
        .limit(pageSize);


        res.status(200).json({message:"success",products,currentPage: page,totalPage})

    } catch (error) {
console.log(error)
    }

});


const deleteproduct = asyncHandler(async(req,res)=>{

    try {
        const userId = req.user.id
        const productId = req.params.id

        const user = await User.findById(userId)
        const product = await Product.findById(productId)
        if(!user || !product){
            res.status(404)({message:"user or product not found "})
        }

        const deleteproduct = await Product.deleteOne(product)

        res.status(200).json({message:"product deleted successfully" + deleteproduct})
    } catch (error) {
        console.log(error)
    }


});





module.exports = {addProduct,getAllproduct,deleteproduct}