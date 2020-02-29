const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('./../models/user');

module.exports.registerUser = function (req, res) {
    const {email, password, passwordConfirm} = req.body;
    let errors = [];

    if (!email || !password || !passwordConfirm) {
        errors.push({msg: 'Please enter all fields'});
    }

    if (password !== passwordConfirm) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('/auth/register', {
            errors,
            email,
            password,
            passwordConfirm
        });
    } else {

        User.findOne({email}, function (err, user) {

            console.log("user: ", user);
            console.log("err: ", err);
            console.log("password: ", password);
            if (user) {
                console.log("user is already taken: ")
                errors.push({msg: 'User is already taken'});
                res.render('auth/register', {
                    errors,
                    email,
                    password,
                    passwordConfirm
                });
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    const newUser = new User({
                        email,
                        password: hash
                    });

                    newUser.save().then(user =>
                        res.redirect('auth/login')
                    ).catch(err => console.log(err));
                });
            }
        });

    }
};

module.exports.loginUser = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/user/index',
        failureRedirect: '/auth/login',
        failureFlash: false
    })(req, res, next);

};

module.exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('auth/login');
};

module.exports.registerUserPage = function (req, res) {
    res.render('auth/register');
};

module.exports.loginUserPage = function (req, res) {
    res.render('auth/login', {title: 'Express'});
};
