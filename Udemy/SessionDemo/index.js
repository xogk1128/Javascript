const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({secret:'thisisnotatgoodsecret'}))

app.get('/viewcount', (req, res)=>{
    res.send(`YOU HAVE VIEWD THIS PAGE X TIMES`);
})

app.listen(3000, ()=>{
    console.log('Serving');
})