const express = require('express');
const app = express();

const User = require('./models/user');

app.get('/secret', (req, res)=>{
    res.send('THIS IS SECRET!');
})

app.listen(3000, ()=>{
    console.log('SERVING YOUR APP!');
})