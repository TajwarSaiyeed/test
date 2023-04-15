const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Order'
        },
        shopifyProductId: {
            type: Number,
            required: true
        },
        shopifyProductHandle: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        productName: {
            type: String,
            required: false
        },
        productVariant: {
            type: Array,
            required: false
        },
        productVariant: [{
            option: {
                type: String,
                required: true
            }, 
            value: {
                type: String,
                required: false
            }
        }],
        price: {
            type: Number,
            required: false
        },
        cost: {
            type: Number,
            required: false
        },
        imageUrl: {
            type: String,
            required: false
        },
        modelNumber: {
            type: String,
            required: false
        },
        supplier: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        condition: {
            type: String,
            required: false
        },
        flyersAdded: {
            type: Boolean,
            required: false
        },
        trackingNumberAgent: {
            type: String,
            required: false
        },
        dateSupplierSent: {
            type: Date,
            required: false
        },
        dateArrived: {
            type: Date,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Item', itemSchema)
