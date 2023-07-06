// const mysql = require('mysql2')
// const pool = mysql.createPool({
//     host:'127.0.0.1',
//     user:'root',
//     database:'node_complete',
//     password:'root'
// })

// module.exports=pool.promise()

// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('node_complete','root','root',{dialect:'mysql',host:'localhost'});
// module.exports=sequelize

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let _db;
const MongoConnect= callback =>{
    MongoClient.connect(
        'mongodb+srv://Yash_Shah:y_a_s_h@cluster0.h0nmwav.mongodb.net/'
        )
    .then(client=>{
        // console.log(client)
    console.log('Connected')
    _db=client.db()
     callback()
})
    .catch(err=>{console.log(err)})
}

const getDb = () =>{
    if(_db){
        return _db
    }
    throw 'No Database Found!'
}

// module.exports=MongoConnect
exports.MongoConnect=MongoConnect
exports.getDb=getDb