const express     = require('express')
const bodyParser  = require('body-parser')
const mentor_router = express.Router()

mentor_router.use(bodyParser.urlencoded({extended: true}))
//user_router.use(bodyParser.json())
// user_router.get('/', (req, res)=> res.send(`Got '/user GET' Request`))// Keep for testing purpose

let mentor_controller = require('../controllers/mentor_c')

mentor_router.get("/",       mentor_controller.select_all)// Get all users.
mentor_router.get("/table",  mentor_controller.records_in_table_form)// Get all users & List in HTML Table.
mentor_router.get("/:id",    mentor_controller.select1_by_id)// Get a selected user.
mentor_router.post("/",      mentor_controller.register)// Save an user Record / Save Register Form data.
mentor_router.post("/check", mentor_controller.authenticate)// Check valid user or not.
mentor_router.delete("/:id", mentor_controller.delete1)// Delete an user Record

module.exports = mentor_router