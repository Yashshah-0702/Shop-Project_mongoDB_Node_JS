const mongodb = require('mongodb')
const getDb=require('../database/database').getDb;

class Product{
  constructor(title,price,description,id,userId){
    this.title=title,
    this.price=price,
    this.description=description,
    this._id=id ? new mongodb.ObjectId(id):null
    this.userId = userId 
  }

  save(){
   const db = getDb()
   let dbop;
   if(this._id){
    dbop=db.collection('products').updateOne({_id:this._id},{$set:this})
   }
   else{
    dbop=db.collection('products').insertOne(this) 
  }
   return dbop
   .then(result=>{
     console.log(result)
   })
   .catch(err=>{console.log(err)})
  }

  static fetchAll(){
    const db = getDb()
    return db.collection('products').find().toArray().then(products=>{
      console.log(products)
      return products
    }).catch(err=>{console.log(err)});
  }

  static findById(prodId){
     const db = getDb()
     return db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).next().then(products=>{
      console.log(products)
      return products
     }).catch(err=>{console.log(err)})
  }
  static deleteById(prodId){
    const db = getDb()
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)}).then(result=>{
      console.log('Deleted...')
    }).catch(err=>console.log(err))
  }
}

module.exports = Product;
