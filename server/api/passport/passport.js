const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/users')

// expose this function to our app using module.exports
module.exports = passportConfig

function passportConfig(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    debugger
    passport.serializeUser(function (user, done) {
        debugger
        done(null, user.id)
    })
    
    passport.deserializeUser(function (id, done) {
        debugger
        Users.findById(id).lean().exec(function (err, user) {
            if (user) {
                user.agency = user.agency.toString();
            }

           done(err, user)
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
        debugger
        // asynchronous
        // Users.findOne wont fire unless data is sent back
        process.nextTick(() => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Users.findOne({
                'local.email': email
            }, findOneComplete)

            function findOneComplete(err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err)
                }

                // check to see if theres already a user with that email
                if (user) {
                    const errorsFound = null
                    const userCreated = false
                    return done(errorsFound, userCreated, {
                        reason: 'User already exists with that email.'
                    })
                } else {
                    // if there is no user with that email, create the user
                    var newUser = new Users()

                    // set the user's local credentials
                    newUser.local.email = email
                    newUser.local.password = newUser.generateHash(password)

                    console.log(newUser);

                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            throw err
                        }
                        return done(null, newUser)
                    })
                }
            }
        })
    }

    // callback with email and password from our form
    function localLogin(req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        Users.findOne({
            'local.email': email
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
