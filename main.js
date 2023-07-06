const express = require('express')
const app = express()
const body = require('body-parser')
const route = require('./routes/route')
const error = require('./controller/error')
const MongoConnect = require('./database/database').MongoConnect

app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended:false}))
  
app.use((req,res,next)=>{
    // User.findByPk(1).then(user=>{
    //     req.user=user;
    //     next()
    // }).catch(err=>console.log(err));
    next()
})

app.use(route)
app.use(error.page)

MongoConnect(()=>{
    app.listen(7400)
})