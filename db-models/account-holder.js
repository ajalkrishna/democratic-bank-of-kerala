const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    accountNo:Number,
    firstname:String,
    lastname:String,
    email:String,
    aadharNo:Number,
    address:Object,
    pin:Number,
    balance:Number,
    transaction:Array
},{collection:'account-holders'})

const accountHolder = mongoose.model('account-holders',userSchema)

module.exports= accountHolder
