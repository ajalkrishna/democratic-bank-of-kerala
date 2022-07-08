const exp = require('express')
const userApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
userApp.use(exp.json())
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../db-models/users')
const Account_Holder = require('../db-models/account-holder')
const Admin = require('../db-models/admin')

// confirm registration
userApp.post('/register', expressAsyncHandler(async (req, res) => {
    let regObj = req.body
    let regDoc = new User({ ...regObj })
    let hashedPw = await bcryptjs.hash(regObj.password, 5)
    regDoc.password = hashedPw
    await regDoc.save()
    res.status(200).send({ message: 'Account Created Successfully' })
}))
// login to dashboard
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    let loginObj = req.body
    let user = await User.findOne({ username: loginObj.username })
    if (user == null) {
        res.status(200).send({ message: 'Invalid username' })
    }
    else {
        let status = await bcryptjs.compare(loginObj.password, user.password)
        if (status == false) {
            res.status(200).send({ message: 'Invalid Password' })
        }
        else {
            let token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: 120 })
            res.status(200).send({ message: 'login Success', accountNo: user.accNo, token: token })
        }
    }
}))

// get user based on account No from Account-holder collection
userApp.post('/get-account', expressAsyncHandler(async (req, res) => {
    let validateAccountNo = req.body.accountNo
    let user = await Account_Holder.findOne({ accountNo: validateAccountNo })
    if (user == null) {
        res.status(200).send({ message: 'Invalid Account Number' })
    }
    else {
        res.status(200).send({ message: 'valid Account Number', payload: user })
    }
}))
// get user based on account No from User Collection
userApp.post('/get-user', expressAsyncHandler(async (req, res) => {
    let validateAccountNo = req.body.accountNo
    let user = await User.findOne({ accNo: validateAccountNo })
    if (user !== null) {
        res.status(200).send({ message: 'Already Registered' })
    }
    else {
        res.status(200).send({ message: 'valid Request' })
    }
}))
// create netbanking account request
userApp.post('/create-request', expressAsyncHandler(async (req, res) => {
    let reqObj = req.body
    let admin =  await Admin.findOne({name:'admin'})
    let allReq = admin.accountRequests
    let existance = allReq.find(request=>request.accountNo==reqObj.accountNo)
    if(existance!==undefined){
        res.status(200).send({message:'Request Already made Once'})
    }
    else{
        allReq.push(reqObj)
        let update = await Admin.updateOne({name:'admin'},{$set:{accountRequests:allReq}})
        res.status(200).send({message:'Request made Successfully!!'})
    }
}))
// ?get request based on account No 
userApp.post('/get-request',expressAsyncHandler(async (req,res)=>{
    let accNo = req.body.accountNo
    let admin =  await Admin.findOne({name:'admin'})
    let allReq = admin.accountRequests
    let existance = allReq.find(request=>request.accountNo==accNo)
    if(existance==undefined){
        res.status(200).send({message:'No Active Requests'})
    }
    else{
        res.status(200).send({payload:existance})
    }
}))
// update AccountHolder Data
userApp.put('/update-profile',expressAsyncHandler(async(req,res)=>{
    let updateObj = req.body
    let update =await Account_Holder.findOneAndReplace({accountNo:updateObj.accountNo},updateObj)
    res.status(200).send({message:'profile Updated'})
}))
// transaction update
userApp.post('/transaction-update',expressAsyncHandler(async(req,res)=>{
    let transObj = req.body
    let user = await Account_Holder.findOneAndUpdate({accountNo:transObj.accountNo},{$push:{transaction:transObj.transactionData}})
    res.status(200).send({message:'transaction details updated'})
    
    // let allTrans = user.transaction
    // allTrans.push(transObj.transactionData)
}))

// error handling middleware
userApp.use((err, req, res, next) => {
    res.send({ message: err.message })
})
module.exports = userApp