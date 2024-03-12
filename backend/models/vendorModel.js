const mongoose = require('mongoose');
const vendorSchema = mongoose.Schema({
    shopName:{
        type: String,
        required: true,

    },
    shopType: {
        type: String,
        enum: ['retail', 'wholesale'],
        required: true,
    },

    email:{
        type:String,
        required: [true,"email is required"],
        unique: true
    },
    password:{
        type: String,
        require:[true , "password is required"],

    }

},{
    timestamps:true

});

module.exports = mongoose.model("Vendor",vendorSchema)