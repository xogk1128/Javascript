const express = require('express')
const app = express();
const shelterRoutes = require('./routes/shelters');
const shelterRoutes = require('./routes/dogs');

app.use('/shelters', shelterRoutes);
app.use('/dogs', shelterRoutes);

app.listen(3000, ()=>{
    console.log('Serving app on localhost:3000');
})