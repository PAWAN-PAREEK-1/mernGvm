const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Product = require('../models/productModel');



const createUser = asyncHandler(async (req,res)=>{

    const {username,email,password} = req.body;
    if(!username || !password || !email){
            res.status(404);
            throw new Error("please enter all user detail")

    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("email is used for other user try new email")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });

    if(user){
        res.status(200).json({_id:user.id,email:user.email,username:user.username});
    }
    else{
        res.status(401)
        throw new Error("user data is not valid")
    }





// res.status(200).json({message:"create user"})
})


const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({ message: 'Please provide a email and password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: 'Please register first' });
        }

        const accessToken = jwt.sign({
            email: user.email,
            id: user.id,
            username: user.username
        }, process.env.ACCESS_TOKEN, {
            expiresIn: "100h"
        });

        res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




const searchproduct = asyncHandler (async (req, res) => {

    try {
        const userId = req.user.id

        const user = await User.findById(userId)

        if (!user) {
            res.status(403).json({ message: "user not found"})
        }



        const {keyword} = req.query

        const products = await Product.find({
            $or: [
                { productName: { $regex: new RegExp(keyword, "i") } },
                { productType: { $regex: new RegExp(keyword, "i") } }
            ]
        }).populate('vendorId');

        res.status(200).json({ products: products });



    } catch (error) {
            console.log(error)
    }


})

module.exports = {loginUser,searchproduct,createUser}