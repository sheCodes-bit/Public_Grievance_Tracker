const mongoose = require("mongoose")

const grievanceSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

desc:{
type:String,
required:true
},

category:{
type:String,
required:true
},

priority:{
type:String,
enum:["Low","Medium","High"],
default:"Medium"
},

city:String,
district:String,
area:String,

image:String,

location:{
lat:Number,
lng:Number
},

status:{
type:String,
enum:["Pending","In Progress","Resolved"],
default:"Pending"
},

votes:{
type:Number,
default:0
},

comments:[
{
text:String,
user:String,
date:{
type:Date,
default:Date.now
}
}
],

timeline:[
{
status:String,
date:{
type:Date,
default:Date.now
}
}
],

createdBy:{
type:String
}

},
{
timestamps:true
})

module.exports = mongoose.model("Grievance", grievanceSchema)