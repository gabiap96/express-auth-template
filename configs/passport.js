const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./../models/user');

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
            email: email
        }).then((user) => {
            if (!user) {
                return done(null, false, {message: 'That email is not registered'});
            }

            // check password
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Password incorrect'})
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
