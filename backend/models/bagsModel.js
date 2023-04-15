const mongoose = require('mongoose');

const bagsSchema = mongoose.Schema(
    {
        max: {
            type: Number,
            required: false
        },
        min: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Bags', bagsSchema)