const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        productId: {
            type: Number,
            required: true
        },
        handle: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },        
        price: {
            type: Number,
            required: false
        },
        cost: {
            type: Number,
            required: false
        },
        image: {
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
        variants: [{
            id: {
                type: Number,
                required: true
            }, 
            name: {
                type: String,
                required: true
            }, 
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }, 
            sku: {
                type: String,
                required: false
            }, 
            image: {
                type: String,
                required: false
            }
        }]

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)
