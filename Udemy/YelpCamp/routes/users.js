const express = require('express');
const router = express.Router({ mergeParams : true});
const passport = require('passport');

const users = require('../controllers/users');

const catchAsync = require('../Utils/catchAsync');

router.route('/register')
    .get('/register', users.renderRegister)
    .post('/register', catchAsync(users.register));

router.route('/login')
    .get('/login', users.renderLogin)
    .post('/login', passport.authenticate('local', { failureFlash : true, failureRedirect : '/login'}), users.login );

router.get('/logout', users.logout);

module.exports = router;