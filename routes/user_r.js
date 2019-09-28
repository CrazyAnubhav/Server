const express     = require('express')
const bodyParser  = require('body-parser')
const user_router = express.Router()

user_router.use(bodyParser.urlencoded({extended: true}))
//user_router.use(bodyParser.json())
// user_router.get('/', (req, res)=> res.send(`Got '/user GET' Request`))// Keep for testing purpose

let user_controller = require('../controllers/user_c')

user_router.get("/",       user_controller.select_all)// Get all users.
user_router.get("/table",  user_controller.records_in_table_form)// Get all users & List in HTML Table.
user_router.get("/:id",    user_controller.select1_by_id)// Get a selected user.
user_router.post("/",      user_controller.register)// Save an user Record / Save Register Form data.
user_router.post("/check", user_controller.authenticate)// Check valid user or not.
user_router.delete("/:id", user_controller.delete1)// Delete an user Record

module.exports = user_router