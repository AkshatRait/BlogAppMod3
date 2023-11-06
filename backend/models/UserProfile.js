const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
    name: String,
    image: String,
},
{
    timestamps:true
})

const UserProfile = mongoose.model('UserProfile', userProfile)
module.exports = UserProfile