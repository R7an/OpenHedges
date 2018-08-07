const passport = require('passport');
const Users = require('../models/users');
const usersService = require('../services/users.service')({
    modelService: Users
});
const responses = require('../models/responses');

module.exports = usersController;

function usersController(){
    return {
        register: register,
        getAll: getAll,
       // update: update,
        remove: remove
    }

    function register(req, res, next) {
        debugger
        passport.authenticate('local-signup', registerDone)(req, res, next)
        function registerDone(err, user, info) {
            debugger
            if (err) return next(err)

            // Generate a JSON response reflecting authentication status
            if (user===null) {
                console.log('ddsds')
                const errorResponseModel = new responses.ErrorResponse(`registration failed: ${info.reason}`)
                errorResponseModel.alert.message = `registration failed: ${info.reason}`

                return res.json(errorResponseModel)
            }

            // ***********************************************************************
            // "Note that when using a custom callback, it becomes the application's
            // responsibility to establish a session (by calling req.login()) and send
            // a response."
            // Source: http://passportjs.org/docs
            // ***********************************************************************
            req.login(user, loginErr => {
                if (loginErr) return next(loginErr)
                console.log('ddsds')
                // const responseModel = new responses.SuccessResponse()
                // responseModel.alert.message = 'Registration succeeded'
                // return res.json(responseModel)
            })
        }
    }

    function getAll(req, res) {
        usersService.getAll()
            .then((users) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = users
                res.json(responseModel)
            })
            .catch((err) => {
                res.status(500)
                    .send(new responses.ErrorResponse(err))
            })
    }

    function remove(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        usersService.removeOne(queryCondition)
            .then((user) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = user
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500)
                    .send(new responses.ErrorResponse(err))
            })
    }

    


}