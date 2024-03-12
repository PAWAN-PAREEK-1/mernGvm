const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productType: {
        type: String,
        enum: ['cosmetics', 'medical'],
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
