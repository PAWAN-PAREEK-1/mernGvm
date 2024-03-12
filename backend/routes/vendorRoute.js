const express = require('express');
const router = express.Router();
const {vendorLogin,updateProfile,getVendorProfile,createvendor,changevendorPassword, getAllproducts, searchproduct} = require("../controller/vendorController")
const {authvendor} = require("../middelware/validateToken");

const asyncHandler = require('express-async-handler');
const { addProduct } = require('../controller/productController');


router.route('/').post(vendorLogin)

router.route('/createvendor').post( createvendor)
router.route('/getVendor').get( authvendor,getVendorProfile)
router.route('/product').put(authvendor,addProduct)
router.route('/getproduct').get( authvendor,getAllproducts)
router.route('/searchproduct').get( authvendor,searchproduct)
router.route('/update/:id').put( authvendor,updateProfile);
router.route('/updatepassword').put( authvendor,changevendorPassword);



module.exports = router;