const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
    {
        invoiceNo: {
            type: Number,
            required: true
        },
        supplier: {
            type: String,
            required: true
        },
        items: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Invoice', invoiceSchema)