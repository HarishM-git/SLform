const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://harishdeepakh:t8kdiX7fv03E30Xx@cluster0.1vk97rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("mongodb connected yhahoo")
})
.catch(()=>{
  console.log("mongodb Failed to connected")
})

const loginSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})
const collection=new mongoose.model("collection1",loginSchema)

module.exports=collection