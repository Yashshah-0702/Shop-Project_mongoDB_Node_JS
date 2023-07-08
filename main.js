const express = require('express')
const app = express()
const body = require('body-parser')
const route = require('./routes/route')
const error = require('./controller/error')
const MongoConnect = require('./database/database').MongoConnect
const User = require('./model/user')


app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended:false}))
  
app.use((req,res,next)=>{
    User.findById("64a793d584db7c9b367c0cf6")
    .then(user=>{
        req.user=user;
        next()
    })
    .catch(err=>console.log(err));
})

app.use(route)
app.use(error.page)

MongoConnect(()=>{
    app.listen(7400)
})