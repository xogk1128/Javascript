const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(()=>{
        console.log("CONNECTION OPEN!!");
    })
    .catch((err)=>{
        console.log("OH NO ERROR!!!!");
        console.log(err);
    });

// ejs 사용
app.set('view engine', 'ejs');
// views 폴더 사용
app.set('views', 'views');
// req.body 파싱
app.use(express.urlencoded({extended : true }));

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
    res.redirect('/');
})

app.get('/secret', (req, res)=>{
    res.send('THIS IS SECRET!');
})

app.listen(3000, ()=>{
    console.log('SERVING YOUR APP!');
})