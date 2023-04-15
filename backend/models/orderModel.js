const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        orderNumber: {
            type: String,   
            required: true         
        },
        customerName: {
            type: String,
            required: false
        },
        customerAddress: {
            type: String,
            required: false
        },
        shippingCost: {
            type: Number,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        trackingNumberCustomer: {
            type: String,
            required: false
        },
        dateOrdered: {
            type: Date,
            required: false
        },
        datePacked: {
            type: Date,
            required: false
        },
        dateDispatched: {
            type: Date,
            required: false
        },
        dateCompleted: {
            type: Date,
            required: false
        },
        dateClosed: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', orderSchema)
