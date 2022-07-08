const exp = require('express')
const adminApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
require('dotenv').config()
adminApp.use(exp.json())
const bcryptjs = require('bcryptjs')
const accountHolder = require('../db-models/account-holder')
const Admin = require('../db-models/admin')
const User = require('../db-models/users')
// import packages for multimedia data operation
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// config cloudinary
cloudinary.config({
    cloud_name:'dk1kforq5',
    api_key:'362226974791292',
    api_secret:'6v2dFVDkfz9YZqgZ6wfjaFMdmsc'
})
// config multer-storage-cloudinary
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Account-proofs',
      public_id: (req, file) => file.fieldname+'-'+Date.now(),
    },
  });
// config multer
const proof = multer({ storage: cloudinaryStorage });


// open-account
adminApp.post('/open-account',expressAsyncHandler(async (req,res)=>{
    let newUser = req.body
    let userFromDb = await accountHolder.findOne({accountNo:newUser.accountNo})
    if(userFromDb!==null){
        res.status(200).send({message:'Account No is already Available'})
    }
    else{
        let userDoc = new accountHolder({...newUser})
        userDoc.save()
        res.status(200).send({message:`New account opened with account No as ${userDoc.accountNo}`,result:'success'})
    }
}))
// get all account holders
adminApp.get('/account-holders',expressAsyncHandler(async (req,res)=>{
    let depositors = await accountHolder.find()
    res.status(200).send({payload:depositors})
}))
// get all request
adminApp.get('/all-requests',expressAsyncHandler(async (req,res)=>{
    let newEntries = await Admin.findOne({name:'admin'})
    res.status(200).send({payload:newEntries})
}))
// get all netbanking-users
adminApp.get('/all-users',expressAsyncHandler(async (req,res)=>{
    let users = await User.find()
    res.status(200).send({payload:users})
}))
// update staus of request
adminApp.put('/update-status',expressAsyncHandler(async (req,res)=>{
    let updateObj = req.body
    let admin = await Admin.findOne({name:'admin'})
    let allReq = admin.accountRequests
    let selectedReq=allReq.find(request=>request.accountNo == updateObj.accountNo)
    let index = allReq.indexOf(selectedReq)
    allReq[index].status=updateObj.status
    let update = await Admin.updateOne({name:'admin'},{$set:{accountRequests:allReq}})
    if(updateObj.status=='Closed'){
        let regObj = {
            username:selectedReq.username,
            password:selectedReq.password,
            accNo:selectedReq.accountNo
        }
        let regDoc = new User({ ...regObj })
        let hashedPw = await bcryptjs.hash(regObj.password, 5)
        regDoc.password = hashedPw
        await regDoc.save()
        res.status(200).send({message:'Account Created Successfully'})
    }
    else{
        res.status(200).send({message:'status updated'})
    }

}))

// error handling middleware
adminApp.use((err,req,res,next)=>{
    res.send({message:err.message})
})

module.exports=adminApp