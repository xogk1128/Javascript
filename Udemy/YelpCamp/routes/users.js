const express = require('express');
const router = express.Router({ mergeParams : true});

const User = require('../models/user');

const ExpressError = require('../Utils/ExpressError');
const catchAsync = require('../Utils/catchAsync');
const { userSchema } = require('../schemas')

router.get('/register', (req, res)=>{
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res)=>{
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUSer = await User.register(user, password);
        
        req.flash('success','Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    } catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));


module.exports = router;