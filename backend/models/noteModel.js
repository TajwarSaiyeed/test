const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Order'
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Item'
        },
        body: {
            type: String,
            required: false
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        postedByName: {
            type: String,
            required: false
        },
        postedDate: {
            type: Date,
            required: false
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        updatedByName: {
            type: String,
            required: false
        },
        updatedDate: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Note', noteSchema)
