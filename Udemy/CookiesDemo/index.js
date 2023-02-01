const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/greet', (req,res)=>{
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey there, ${name}`);
})

app.get('/setName', (req,res)=>{
    res.cookie('name', 'stevie chicks');
    res.send('OK SENT YOU A COOKIE!!');
})

app.listen(3000, ()=>{
    console.log('Serving');
})