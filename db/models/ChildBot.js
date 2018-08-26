const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChildBotSchema = new Schema({
  mainWorkspace: String,
  token: String,
  channel: String
})

const ChildBot = mongoose.model('ChildBot', ChildBotSchema)

module.exports = ChildBot
