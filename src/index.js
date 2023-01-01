const express=require('express')
const mongoose=require('mongoose')
const route=require('./route/route')
const app=express()

app.use(express.json())

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Mamtabisht:MJaxD9J354kKdTCm@cluster0.uvj5esy.mongodb.net/mamtaDB?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>console.log('mongodb is connected'))
.catch((err)=>console.log(err.message))

app.use('/',route)

app.listen(process.env.PORT || 3000,function(){
console.log('port is listening on 3000')
})