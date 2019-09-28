const mongoose = require("mongoose")

const mentor_master = mongoose.model('mentor_master', new mongoose.Schema({
  firstname: {type: String, required: true, unique: false},
  lastname: {type: String, required: true, unique: false},
  email:  {type: String, required: true, unique: true },
  password: {type: String, required: true, unique: false}
},{strict: true}))

module.exports = mentor_master