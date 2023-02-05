const express = require('express');
const app = express();

const User = require('./models/user');

// ejs 사용
app.set('view engine', 'ejs');
// views 폴더 사용
app.set('views', 'views');

app.get('/register', (req, res)=>{
    res.render('register');
})

app.get('/secret', (req, res)=>{
    res.send('THIS IS SECRET!');
})

app.listen(3000, ()=>{
    console.log('SERVING YOUR APP!');
})