const jwt      = require('jsonwebtoken')// JSON Web Token to Secure REST APIs
let mentor_model = require('../models/mentor_m')
const config   = require('./../config/config')// config/config.js

function create_token(email_id){
    // sign with default (HMAC SHA256)
    let expire_time =  Math.floor(Date.now() / 1000) + (config.jwt_token_valid * 60) // jwt_token_valid is in Minutes, so convert in to Seconds from now
    let token = jwt.sign({ email_id: email_id, exp: expire_time }, config.secret_word)
    return token
}

module.exports = {
select_all: async (req, res)=>{// Get all users
    try {
        let users = await mentor_model.find().exec()
        res.send(users)
    } catch(err) {
        res.status(500).send(err)
    }
},
records_in_table_form: async (req, res)=>{// Get all users & List in HTML Table
    try {
        let users = await mentor_model.find().exec()
        let html = '<h1>User List</h1><table border="1" cellspacing="0" cellpadding="5"><tr><th>SrNo</th><th>_id</th><th>User Name</th><th>Email Id</th><th>Password</th></tr>'
        let serial_no = 1
        users.forEach((record)=>{
            html += `<tr><td>${serial_no}</td><td>${record._id}</td><td>${record.user_name}</td><td>${record.email_id}</td><td>${record.pass_word}</td></tr>`
            serial_no++
        })
        html += '</table>'
        res.send(html)
    } catch(err) {
        res.status(500).send(err)
    }
},
select1_by_id: async (req, res)=>{// Get a selected user
    try {
        let user = await mentor_model.findById(req.params.id).exec()
        res.send(user)
    } catch(err) {
        res.status(500).send(err)
    }
},
register: async(req, res)=>{// Save an user Record
    try {
        console.log(req.body)
        let user   = new mentor_model(req.body)
        let result = await user.save()
        res.send(result)
    } catch(err) {
        res.status(500).send(err)
    }
},
authenticate: async(req, res)=>{// Check valid user or not
    try {
        console.log(req.body)
        let users = await mentor_model.find({ email: req.body.email, password: req.body.password }).exec()
        //console.log(users.length)
        //console.log(users)
        if(users.length == 1) {// Found User record for given email_id & pass_word
            res.send(create_token(req.body.email))// Send token to Frontend if a Valid User is Logging in
            //res.send("Valid User")
        } else {
            res.send("Invalid User")// User not found or he did not Register with us
        }
    } catch(err) {
        res.status(500).send(err)
    }
},
delete1: async(req,res)=>{// Delete an user Record
    try {
        let result = await mentor_model.deleteOne({_id: req.params.id}).exec()
        res.send(result)
    } catch(err) {
        res.status(500).send(err)
    }
}
}