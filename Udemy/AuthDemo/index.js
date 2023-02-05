const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.set('strictQuery',true)
mongoose.connect('mongodb://127.0.0.1:27017/authDemo', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Databasee connected");
});

// ejs 사용
app.set('view engine', 'ejs');
// views 폴더 사용
app.set('views', 'views');
// req.body 파싱
app.use(express.urlencoded({extended : true }));
// 세션 사용
app.use(session({ secret: 'notagoodsecret'}));
// 로그인 미들웨어
const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res)=>{
    res.send('THIS IS THE HOME PAGE');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post('/register', async (req, res)=>{
    const { username , password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password : hash
    });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username , password } = req.body;
    const user = await User.findOne({ username });
    const ValidPassword = await bcrypt.compare(password, user.password);
    if(ValidPassword){
        req.session.user_id = user._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
})

app.post('/logout', (req, res)=>{
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res)=>{
    res.render('secret');
})

app.get('/topsecret', requireLogin, (req, res)=>{
    res.send('Top secret');
});

app.listen(3000, ()=>{
    console.log('SERVING YOUR APP!');
})