const express = require('express');
const session = require('express-session');
const app = express();

const sessionOptions = { secret:'thisisnotatgoodsecret', resave : false, saveUninitialized : false };
app.use(session(sessionOptions));

app.get('/viewcount', (req, res)=>{
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`YOU HAVE VIEWD THIS PAGE ${req.session.count} TIMES`);
});

app.get('/register', (req, res) => {
    const { username = 'Anonymous'} = req.query;
    req.session.username = username;
    res.redirect('/greet');
});

app.get('/greet', (req, res)=>{
    const { username } = req.session;
    res.send(`Hey there, ${username}`);
})

app.listen(3000, ()=>{
    console.log('Serving');
})