const LocalStrategy = require('passport-local').Strategy
const User = require('../models').User

// expose this function to our app using module.exports
module.exports = passportConfig

function passportConfig(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
        User.findAll({
            where: {
                'id': id
            }
        }).then(function (err, user) {
            done(err, user);
        })
    })

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
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                where: {
                    'email': email
                }
            }).then(findOneComplete)
            .catch(error => {
                // if there are any errors, return the error
                return done({error:true, reason:error})
                })

            function findOneComplete(user) {
                // check to see if theres already a user with that email
                if (user) {
                    return done({ error:true,reason: 'A user with this email already exists.' })
                } else {
                    // if there is no user with that email, create the user
                    let newUser;
                    try {
                        newUser = new User();
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;
                        newUser.username = req.body.username;
                        newUser.email = email
                        newUser.password = newUser.generateHash(password)
                        User.create(newUser.dataValues).then((user) => {
                            return done({error:false, user:user});
                        }).catch((error) => {
                            return done({error:true, reason:error});
                        })
                    } catch (error) {
                        return done({error:true, reason:error});
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
}
