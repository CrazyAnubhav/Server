const express     = require('express')
const bodyParser  = require('body-parser')
const item_router = express.Router()

item_router.use(bodyParser.urlencoded({extended: true}))
//item_router.use(bodyParser.json())
// item_router.get('/', (req, res)=> res.send(`Got '/item GET' Request`))// Keep for testing purpose

let item_controller = require('../controllers/item_c')

item_router.get("/",       item_controller.select_all)// Get all items.
item_router.get("/table",  item_controller.records_in_table_form)// Get all items & List in HTML Table.
item_router.get("/:id",    item_controller.select1_by_id)// Get a selected item.
item_router.post("/",      item_controller.insert)// Save an item Record.
item_router.delete("/:id", item_controller.delete1)// Delete an item Record

module.exports = item_router