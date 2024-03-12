const express = require('express')
const router = express.Router()
const {loginUser, searchproduct, createUser} = require("../controller/userController")
const {authvendor} = require("../middelware/validateToken")
const { getAllproduct, deleteproduct} = require("../controller/productController")



router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/getproduct').get(getAllproduct)
router.route('/searchproduct').get(authvendor,searchproduct)

router.route('/deleteproduct/:id').delete(authvendor,deleteproduct)


module.exports = router;