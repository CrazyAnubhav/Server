const express  = require('express')// server.js
const mongoose = require('mongoose')// Supports Model / Schema Structure
const jwt      = require('jsonwebtoken')// JSON Web Token to Secure REST APIs
const cors     = require('cors')// Allows Cross Site Access
const config   = require('./config/config')// config/config.js
const app      = express()

app.use(cors())// Allows Cross Site Access

mongoose.connect(`${config.mongodb_server}${config.database_name}?retryWrites=true`,
            {useNewUrlParser: true, useCreateIndex: true}, (err, result)=>{
    /*if(!err){
        console.log(`Connected to Database : ${config.database_name}`)
    }*/
    if(err){
        console.log("Failed to connect to Database Server, Check your Database Server URL, User ID & Password!")
        console.log(err.message)
        //console.log(err)
    } else {
        console.log(`Connected to Database : ${config.database_name}`)
        // console.log('Host : ' + result.host)
        // console.log('User : ' + result.user)
    }
})

app.get('/', (req, res)=>{// http:localhost:3000.
    res.send(`<h1>Amar REST APIs Home page</h1>`)
})

const user_route = require('./routes/user_r')// user routes
app.use('/user', user_route)// user routes
/* app.get('/user', (req, res)=>{// http:localhost:3000/user
    res.send(`user GET Request`)
}) */

const mentor_route = require('./routes/mentor_r')// user routes
app.use('/mentor', mentor_route)

const admin_route = require('./routes/admin_r')// user routes
app.use('/admin', admin_route)

const item_route = require('./routes/item_r')// item routes
app.use('/item', validate_token, item_route)// item routes
app.use('/itemdev', item_route)// item routes

app.listen(config.port_no, ()=>{
    console.log(`Server is running at http://${config.host_name}:${config.port_no}`)
})

function validate_token(req, res, callback) {
    // Express headers are auto converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization']
    //if (token.startsWith('Bearer ')) {
        //token = token.slice(7, token.length)// Remove Bearer from token string
    //}
	//console.log(token)
    jwt.verify(token, config.secret_word, (err, decoded)=>{
        if(err) {
			console.log("JWT : " + err.message)
            //res.json({status:'JWT Error', message:err.message})
            res.send("JWT : " + err.message)
        } else {
			console.log("JWT : No Error")
            callback()
        }
    })
}