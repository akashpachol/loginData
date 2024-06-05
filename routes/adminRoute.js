const express=require('express');
const session=require('express-session')
const adminRoute=express();
const config=require('../config/config')
const adminController = require('../controller/adminController');
const auth=require('../middleware/adminAuth')

adminRoute.use(session({
    secret:config.sessionSecret,
    resave: false,
    saveUninitialized: true
}))

adminRoute.set('view engine', 'ejs')
adminRoute.set('views','./views/admin')


adminRoute.get('/',auth.isLogout,adminController.loadAdminLogin );

adminRoute.post('/',adminController.verifyLogin );
// home
adminRoute.get('/home',auth.isLogin,adminController.loadHome );
adminRoute.get('/logout',auth.isLogin,adminController.adminLogout );
adminRoute.get('/dashboard', adminController.adminDashboard);
adminRoute.get('/newUser', adminController.newUserLoad);

adminRoute.post('/newUser',auth.isLogin,adminController.addUser)

adminRoute.get('/editUser', auth.isLogin, adminController.editUserLoad);
adminRoute.post('/editUser',auth.isLogin,adminController.editUser);

adminRoute.get('/deleteUser',adminController.deleteUser)
adminRoute.get('*',(req,res)=>{
    res.redirect('/admin')
})


module.exports=adminRoute
