const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  message: String,
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
