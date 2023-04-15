const mongoose = require('mongoose')

const logSchema = mongoose.Schema(
  {
    type: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Log', logSchema)
