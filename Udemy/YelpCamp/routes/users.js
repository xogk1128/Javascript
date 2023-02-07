const express = require('express');
const router = express.Router({ mergeParams : true});

const User = require('../models/user');

const ExpressError = require('../Utils/ExpressError');
const catchAsync = require('../Utils/catchAsync');
const { userSchema } = require('../schemas')

router.get('/register', (req, res)=>{
    res.render('users/register');
});

router.post('/register', async (req, res)=>{
    const { email, username, password } = req.body;
});

module.exports = router;