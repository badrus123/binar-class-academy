const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChatSchema = new Schema(
  {
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null },
  },
  { versionKey: false },
)
module.exports = mongoose.model('chat', ChatSchema)
