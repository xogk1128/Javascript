const express = require('express');
const app = express();

app.get('/greet', (req,res)=>{
    res.send("Hey there!");
})

app.get('/setName', (req,res)=>{
    res.cookie('name', 'stevie chicks');
    res.send('OK SENT YOU A COOKIE!!');
})

app.listen(3000, ()=>{
    console.log('Serving');
})