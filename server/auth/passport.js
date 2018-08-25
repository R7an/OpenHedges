const passport = require('passport');
const User = require('../models').User
const usersService = require('../services/users.service')({
    modelService: User
});

// expose this function to our app using module.exports
module.exports = () => {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
        usersService.getById(id)
            .then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    done(user.errors, null);
                }
            })
    });
};
