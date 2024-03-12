const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Vendor = require('../models/vendorModel');
const Product = require('../models/productModel'); 


// const vendorEmail = 'vendor@mail.com';
// const vendorPassword = 'vendor'

const vendorLogin = asyncHandler(async(req, res) => {

const {email,password} = req.body;

if(!email || !password){
    res.status(403);
    throw new Error("all required fields");
}

const vendor = await Vendor.findOne({email})



if(vendor && (await bcrypt.compare(password,vendor.password))){
    const accessToken = jwt.sign({
        email:vendor.email,
        id:vendor.id,
    },process.env.ACCESS_TOKEN,{
        expiresIn:"100h"
    })
    res.status(200).json({_id:vendor.id,accessToken:accessToken});
}
else{
    res.status(404)
    throw new Error("login details is not correct")
}


    // res.status(200).json({message:"vendor login successfuly ",accessToken});
})

const createvendor = asyncHandler(async(req, res)=>{
        const {email, password,shopName,shopType} = req.body;
        if(!email || !password || !shopType || !shopName){
            res.status(404);
            throw new Error("all required fields");
        }
        const vendorAvailable = await Vendor.findOne({email});
        if(vendorAvailable){
            res.status(403);
            throw new Error("email is not available");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hash password:"+ hashedPassword)
        const vendor = await  Vendor.create({
            email,
             password:hashedPassword,
             shopName:shopName,
             shopType:shopType
            });
            if(vendor){
                res.status(200).json({_id:vendor.id,email:vendor.email,shopName:shopName,shopType:shopType});
            }
            else{
                res.status(404);
                throw new Error("vendor cant be created");
            }
})


const changevendorPassword = asyncHandler(async (req, res) => {
    console.log("vendor id from auth " + req.user.id)
    const { oldPassword, newPassword } = req.body;
    const accessToken = req.user.id

    if (!oldPassword || !newPassword || !accessToken ) {
        res.status(400);
        throw new Error("Fill all required fields");
    }



    const vendor = await Vendor.findById(accessToken);

    if (!vendor) {
        res.status(404);
        throw new Error("vendor not found");
    }
      else  if(oldPassword == newPassword){
        res.status(404);
        throw new Error("old and new password cant be same");
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, vendor.password);

    if (!isPasswordMatch) {
        res.status(401);
        throw new Error("Old password is not correct");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    vendor.password = hashedPassword;
    await vendor.save();

    res.status(200).json({ message: "Update vendor password successfully", data: vendor.password });
});



const updateProfile = asyncHandler(async (req, res) => {

    const vendor =  await Vendor.findById(req.params.id);
    if(!vendor){
        res.status(404);
        throw new Error("vendor is not available")
    }
     const updateVendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
        )



    res.status(200).json({updateVendor})

})

const getVendorProfile = asyncHandler(async (req, res) => {

    const vendorId = req.user.id;
    const findvendor = await Vendor.findById(vendorId);
    if(!findvendor){
        res.status(404).json({message:"vendor is not available"});
    }

    const vendor = await Vendor.find(findvendor)
    const products = await Product.find({ vendorId: vendorId });

    res.status(200).json({vendor,products})
});


const getAllproducts = asyncHandler(async (req, res) => {
    try {

        const vendorId = req.user.id

        const vendor = await Vendor.findById(vendorId)

        if (!vendor) {
            res.status(403).json({message:"vendor not found"})
        }

        const product = await Product.find()




        res.status(200).json({message:"all products",product})
    } catch (error) {
            console.log(error)
    }

})

const searchproduct = asyncHandler(async(req,res)=>{



    try {
        const vendorId = req.user.id
        const vendor = await Vendor.findById(vendorId)
        if (!vendor) {
            res.status(403).json({message:"vendor not found"})
        }
        const {keyword} = req.query

        const products = await Product.find({
            $or: [
                { productName: { $regex: new RegExp(keyword, "i") } },
                { productType: { $regex: new RegExp(keyword, "i") } }
            ]
        });


        res.status(200).json({message:"search products",products})

    } catch (error) {
console.log(error)
    }
})



module.exports = { vendorLogin,updateProfile,getVendorProfile,createvendor,changevendorPassword,getAllproducts,searchproduct}