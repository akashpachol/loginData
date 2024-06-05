const express=require('express');
const bodyParser=require('body-parser')
const userRoute=express();
// userRoute.use(session({
//     secret:config.sessionSecret,
//     resave: false,
//     saveUninitialized: true 
// }))

const auth=require('../middleware/auth')

const userControler=require('../controller/userControler')

userRoute.set('view engine','ejs');
userRoute.set('views','./views/users')




// user registeration
userRoute.get('/register',auth.islogout,userControler.loadRegister );

userRoute.post('/register',userControler.insertUser );
// user login
userRoute.get('/',auth.islogout,userControler.loadLogin );

userRoute.post('/',userControler.verifyLogin );
// home
userRoute.get('/home',auth.islogin,userControler.loadHome );
userRoute.get('/logout',auth.islogin,userControler.userLogout );


module.exports=userRoute
