const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/user_managment')
const express = require('express');
  const userRoute=require('./routes/userRoute')
  const adminRoute=require('./routes/adminRoute')
const config=require('./config/config')
const session=require('express-session')
  const path=require('path')
const app = express();

app.use(session({
  secret:config.sessionSecret,
  resave: false,
  saveUninitialized: true
}))
// Set the port number
const port=process.env.PORT||4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// load static asset to server
// Serve the static folder
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/asset')))

app.use((req,res,next)=>{
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next()
})
// Create a simple route 
app.use('/',userRoute)

// Create a simple route 
app.use('/admin',adminRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});