//IMPORTS
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const User = require('./models/User.js');
const Post = require('./models/Post.js');
require('./config/db.js');
const app = express();
const PORT = 3000;

//START MIDDLEWARE
app.use(express.json());

app.use(cors({
    origin:"*"
}));

app.use((req,res,next)=>{
    if (req.path.startsWith('/server')) {
        req.url = req.url.replace('/server', ''); // strip /server from the path
    }
    next(); 
});

app.use(express.static(path.join(__dirname, "../client/dist")))

//END MIDDLEWARE


//GET ROUTES
app.get("/getPosts",async (req,res)=>{
    try{
        let responseFromDb = await Post.find();
        res.send(responseFromDb)
    }catch(err){
        res.status(404).send(err)
    }
})



//POST ROUTES
app.post('/createPost',async(req,res)=>{
    try{
        let dbResponse = await Post.create(req.body);
        res.status(200).send("Post made successfully")
    }catch(err){
        res.status(400).send("Error making post")
    }
})

app.post("/createUser",async(req,res)=>{
    try{
        let dbResponse = await User.create(req.body)
        res.send("User Created")
    }catch(err){
        console.log(err);
    }
})


//PUT ROUTES
//DELETE ROUTES
app.listen(PORT,()=>{
    console.log(`Server is live and listening on ${PORT}`)
})