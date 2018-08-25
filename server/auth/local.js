const passport = require('passport');
const passportInit = require('./passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;
const usersService = require('../services/users.service')({
    modelService: User
});


passportInit();

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', // by default, local strategy uses username, we will override with email
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, localSignup))

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, localLogin))

function localSignup(req, email, password, done) {
    // asynchronous
    process.nextTick(() => {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        usersService.getByEmail(email)
            .then(findOneComplete)
            .catch(error => {
                // if there are any errors, return the error
                done({ error: true, reason: error })
            })

        function findOneComplete(user) {
            // check to see if theres already a user with that email
            if (user) {
                done({ error: true, reason: 'A user with this email already exists.' })
            } else {
                // if there is no user with that email, create the user
                try {
                    const userData = req.body;
                    usersService.insert(userData)
                        .then((user) => {
                            done({ error: false, user: user });
                        }).catch((error) => {
                            done({ error: true, reason: error });
                        })
                } catch (error) {
                    done({ error: true, reason: error });
                }
            }
        }
    })
}

// callback with email and password from our form
function localLogin(req, email, password, done) {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists

    User.findAll({
        where: {
            'email': email
        }
    }, findOneComplete)

    function findOneComplete(err, user) {
        // if there are any errors, return the error before anything else
        if (err) {
            return done(err)
        }

        // if no user is found, return the message
        if (!user) {
            return done(null, false, {
                reason: 'User not found.'
            })
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
            return done(null, false, {
                reason: 'Wrong password.'
            })
        }

        // all is well, return successful user
        return done(null, user)
    }
}

module.exports = passport;
