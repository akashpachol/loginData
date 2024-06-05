const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const loadAdminLogin = async (req, res) => {
  try {

    res.render("login");
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const verifyLogin = async (req, res) => {
  console.log("hellloo");
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch && userData.isAdmin === 1) {
        req.session.user_id = userData._id;
        res.redirect('/admin/home');
      } else {
        res.render('login', { message: "Email and password are incorrect" });
      }
    } else {
      res.render('login');
    }
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const loadHome = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    if (userData) {

      res.render('adminHome', { admin: userData });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const adminLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/admin');
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const adminDashboard = async (req, res) => {
  try {
    let search = '';
console.log(req.query.search);
    if (req.query.search) {
      search = req.query.search;
    }

    const usersData = await User.find({
      isAdmin: 0,
      $or: [
        { name: { $regex: '.*' + search + '.*', $options: 'i' } },
        { email: { $regex: '.*' + search + '.*', $options: 'i' } },
        { mobile: { $regex: '.*' + search + '.*', $options: 'i' } }
      ]
    });

    res.render('dashboard', { users: usersData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const newUserLoad = async (req, res) => {
  try {
    res.render('newUser');
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const secure_password = await securePassword(password);

    const user = new User({
      name,
      email,
      mobile,
      password: secure_password,
      isAdmin: 0,
    });

    const userData = await user.save();

    if (userData) {
      res.redirect('/admin/dashboard');
    } else {
      res.render('newUser', { message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const editUserLoad = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await User.findById(id);

    if (userData) {
      res.render('editUser', { user: userData });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const editUser = async (req, res) => {
  try {
    const { id, name, email, mobile } = req.body;
    const userData = await User.findByIdAndUpdate(id, { name, email, mobile });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    await User.deleteOne({ _id: id });
    
    // if (req.session.user_id===id) {
    //   req.session.user_id=null;
    //   res.redirect('/admin/dashboard');

    // }
    
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error.message);
      console.log(error.message)

  }
};

module.exports = {
  loadAdminLogin,
  verifyLogin,
  loadHome,
  adminLogout,
  adminDashboard,
  newUserLoad,
  addUser,
  editUserLoad,
  editUser,
  deleteUser,
};
