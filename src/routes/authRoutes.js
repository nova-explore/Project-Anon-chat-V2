const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.redirect('/signup');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
);

module.exports = router;
