const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const product = [
  {
    cardvalue: "Classic leather",
    url: "https://imagescdn.reebok.in/img/app/product/9/919795-11524629.jpg?q=75&auto=format&w=387",
  },
  {
    cardvalue: "Running Shoes",
    url: "https://imagescdn.reebok.in/img/app/product/9/921369-11570205.jpg?q=75&auto=format&w=387",
  },
  {
    cardvalue: "Performans &Style",
    url: "https://imagescdn.reebok.in/img/app/product/9/921365-11570169.jpg?q=75&auto=format&w=387",
  },
  {
    cardvalue: "Slides",
    url: "https://imagescdn.reebok.in/img/app/product/9/915219-11382452.jpg?q=75&auto=format&w=387",
  },
];

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};



// get register
const loadRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error.message)
  }
};

// post register
const insertUser = async (req, res) => {
  try {
    console.log(req.body,"fdhfgdjfgdjh");
    const secure_password = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: secure_password,
      is_admin: 1,
    });
    const userData = await user.save();
    // res.status(200).send("Registration successful");
    console.log(userData, "llllldfff");

    if (userData) {
      // res.render("login", { message: "register successfully" });
      res.redirect("/");

      console.log("end");
    } else {
      res.render("register", { message: "register has been failed" });
    }
  } catch (error) {
    console.log(error.message)
  }
};



// get login
const loadLogin = async (req, res) => {
  try {

      res.render("login");
      

  } catch (error) {
    console.log(error.message)
  }
};



const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch && userData.isAdmin === 0) {
        console.log(userData);
        req.session.user_id = userData._id;
        res.redirect("/home");
      } else {
        res.render("login", { message: "email and password is incorrect" });
      }
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error.message)
  }
};

const loadHome = async (req, res) => {
  try {

 
 
      res.render("home", { product });
    
  } catch (error) {
    console.log(error.message)
  }
};

const userLogout = async (req, res) => {
  try {
  

    req.session.destroy()
     
  
        res.redirect("/");
   
      }



   catch (error) {
    console.log(error.message)
  }
};

module.exports = {
  insertUser,
  loadRegister,
  loadLogin,
  verifyLogin,
  loadHome,
  userLogout,
};
