const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type:String},
    lastName: {type:String},
    image:{type:String},
    email: {type:String,require: true},
    password: { type: String, require: true },
},
{
    timestamps:true
})

const User = mongoose.model('User', userSchema)
module.exports = User