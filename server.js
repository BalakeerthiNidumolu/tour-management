const exp=require('express')
const app=exp()
const cors=require('cors')
app.use(cors())
require('dotenv').config()

const {MongoClient}=require('mongodb')
let mClient=new MongoClient(process.env.DB_URL)

mClient.connect()
.then((connectionObj)=>{
    const fsddb=connectionObj.db('tours_booking')
    const usersCollection=fsddb.collection('users')
    const bookingsCollection=fsddb.collection('bookings')
    app.set('usersCollection',usersCollection)
    app.set('bookingsCollection',bookingsCollection)

    console.log('DB connection successful')
    app.listen(process.env.PORT,()=>console.log('http server started on port 4000'))
})
.catch(err=>console.log("Error in DB connection",err))

const usersApp=require('./APIs/usersApi')
const bookingsApp=require('./APIs/bookingsApi')

app.use('/users-api',usersApp)
app.use('/bookings-api',bookingsApp)

app.use('*',(req,res,next)=>{
    res.send({message:`Invalid path`})
})

app.use((err,req,res,next)=>{
    res.send({message:"error occurred",errorMessage:err.message})
})