const mongoose = require("mongoose")

const user_master = mongoose.model('user_master', new mongoose.Schema({
  firstname: {type: String, required: true, unique: false},
  lastname: {type: String, required: true, unique: false},
  email:  {type: String, required: true, unique: true },
  password: {type: String, required: true, unique: false}
},{strict: true}))

module.exports = user_master