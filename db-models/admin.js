const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    accountRequests:Array,
    notificatons:Array
},{collection:'admin'})

const adminModel = mongoose.model('admin',adminSchema)

module.exports = adminModel