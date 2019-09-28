const mongoose = require("mongoose")

const admin_master = mongoose.model('admin_master', new mongoose.Schema({
  firstname: {type: String, required: true, unique: false},
  lastname: {type: String, required: true, unique: false},
  email:  {type: String, required: true, unique: true },
  password: {type: String, required: true, unique: false}
},{strict: true}))

module.exports = admin_master