const exp = require('express')
const app = exp()
const adminApp = require('./apis/adminApi')
require('dotenv').config()
const mongoose = require('mongoose')
const userApp = require('./apis/userApi')
const path = require('path')

// connect angular APP
app.use(exp.static(path.join(__dirname,'./dist/DBK')))

const dbConnectionUrl=process.env.DB_URL

mongoose.connect(dbConnectionUrl)
.then(()=>console.log('db connection successful'))
.catch(err=>console.log('error in db connectivity',err.message))


app.use('/admin',adminApp)
app.use('/user',userApp)


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/DBK/index.html'))
})

app.listen(process.env.PORT,()=>console.log('server is running on '+ process.env.PORT))