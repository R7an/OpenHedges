const passport = require('../auth/local');
const responses = require('../models/responses');

module.exports = authController;

function authController(){
    return {
        //login: login,
        register: register,
    }

    // function login (req, res, next){
    //    
    // }

    function register(req, res, next) {
        passport.authenticate('local-signup', registerDone)(req, res, next)
         function registerDone(response) {
             // Generate a JSON response reflecting authentication status
            if (response.error) {
                const errorResponseModel = new responses.ErrorResponse(`registration failed: ${response.reason}`)
                errorResponseModel.alert.message = `registration failed: ${response.reason}`
                return res.status(409).json(errorResponseModel);
            }

            // ***********************************************************************
            // "Note that when using a custom callback, it becomes the application's
            // responsibility to establish a session (by calling req.login()) and send
            // a response."
            // Source: http://passportjs.org/docs
            // ***********************************************************************
            req.login(response.user, loginErr => {
                if (loginErr) return next(loginErr)
                const responseModel = new responses.SuccessResponse()
                responseModel.alert.message = 'Registration succeeded';
                responseModel.item = response.user.id;
                return res.status(200).json(responseModel)
            })
        }
    }
}