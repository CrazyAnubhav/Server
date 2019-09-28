const mongoose = require("mongoose")

const item_master = mongoose.model('item_master', new mongoose.Schema({
  item_name:   {type: String, required: true,  unique: true },
  description: {type: String, required: false, unique: false},
  image_name:  {type: String, required: false, unique: false},
  cost:        {type: Number, required: true,  unique: false}
},{strict: true}))

module.exports = item_master