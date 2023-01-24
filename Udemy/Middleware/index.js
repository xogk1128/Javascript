const express = require('express');
const morgan = require('morgan');
const app = express();

morgan('tiny');

app.get('/', (req,res)=>{
    res.send('Home Page!');
});

app.get('/dogs', (req,res)=>{
    res.send('WOOF WOOF!');
});

app.listen(3000, ()=>{
    console.log('App is running on Port 3000');
});