//IMPORTS
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')
const User = require('./models/User.js');
const Post = require('./models/Post.js');
require('./config/db.js');
require('dotenv').config()
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt');
const UserProfile = require('./models/UserProfile.js');

//START MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));
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


let listOfUsers = [];


//GET ROUTES
app.get("/getPosts",async (req,res)=>{
    try{
        let responseFromDb = await Post.find();
        res.send(responseFromDb)
    }catch(err){
        res.status(404).send(err)
    }
})

app.get("/getUser/:emailOfUser", async (req, res) => {
  try {
      const userEmail = req.params.emailOfUser;
      const dbResponse = await User.findOne({ email: userEmail });
      if (dbResponse) {
          res.status(200).json({ message: "User found", user: dbResponse });
      } else {
          res.status(404).json({ message: "User NOT found" });
      }
  } catch (err) {
      res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/getUsers',async(req,res)=>{
  try{
    listOfUsers = await User.find();
    console.log(listOfUsers);
    res.send('Users found')
  }catch(err){
    console.log(err)
  }
})


//POST ROUTES
app.post('/getSignedinUser', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (!userEmail || !userPassword) {
      return res.status(400).json({message:'Email or password is missing or invalid'});
    }

    // Find the user based on the email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(userPassword, user.password, (err, result) => {
      if (err || !result) {
        // Passwords don't match
        return res.status(401).json({ message: 'Authentication failed' });
      }

      // Passwords match, so the user is authenticated
      // Here, you can generate and send a token or session ID to the client
      // for subsequent authenticated requests.

      // For this example, we'll just send a success message.
      res.status(200).json({ message: 'Authentication successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/createPost',async(req,res)=>{
    try{
        let dbResponse = await Post.create(req.body);
        res.status(200).send("Post made successfully")
    }catch(err){
        res.status(400).send("Error making post")
    }
})


app.post("/createUser", async (req, res) => {
    let userInfo = req.body;
    const { email, password, firstName, lastName ,submitHappened,setSubmitHappened} = userInfo;
    const existingUser = listOfUsers.find((user) => user.email === userInfo.email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists. Please Log In.' });
    }
  
    try {
      const saltRounds = 10; // Define the number of salt rounds
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).send('Error hashing the password');
        }
  
        const newUser = {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        };
        listOfUsers.unshift(newUser);
  
        await User.create(listOfUsers[0]);
        return res.status(201).json(newUser);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Error creating user');
    }
  });
  


  app.post('/makeProfile',async(req,res)=>{
    try{
      let dbResponse = await UserProfile.create(req.body);
      res.status(200).send('Made the Profile')
    }catch(err){
      res.send("error making profile")
    }

  })
//PUT ROUTES
app.put("/editPost/",async (req,res)=>{
  try{
    let idOfPost = req.query.idOfPost
    const { image, caption } = req.body;
    if(image === ""){
      let dbResponse = await Post.findByIdAndUpdate(
        idOfPost, 
        {caption},
        {new:true});
      res.status(200).send("Editing successful")
    }else{
      let dbResponse = await Post.findByIdAndUpdate(
        idOfPost, 
        {image,caption},
        {new:true});
      res.status(200).send("Editing successful")
    }
  }catch(err){
    res.status(400).json({message:'Error editing post'})
  }
})

//DELETE ROUTES
app.delete('/deletePost',async(req,res)=>{
  try{
  let idOfPost = req.body.id
  let dbResponse = await Post.deleteOne({_id : idOfPost})
  res.send("delete successful")}
  catch(err){
    res.send(err)
  }
})
app.listen(PORT,()=>{
    console.log(`Server is live and listening on ${PORT}`)
})