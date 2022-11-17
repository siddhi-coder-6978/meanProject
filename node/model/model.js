const mongoose = require('mongoose')

var users = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
username:String,
email:String,
password:String
})

module.exports = mongoose.model("userdetails", users)