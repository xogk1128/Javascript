const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'));

app.get('/greet', (req,res)=>{
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey there, ${name}`);
})

app.get('/setName', (req,res)=>{
    res.cookie('name', 'stevie chicks');
    res.send('OK SENT YOU A COOKIE!!');
})

app.get('/getsignedcookie', (req,res)=>{
    res.cookie('fruit', 'grape', {signed : true});
    res.send('OK SIGNED YOUR FRUIT COOKIE!!');
})

app.get('/verifyfruit', (req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})


app.listen(3000, ()=>{
    console.log('Serving');
})