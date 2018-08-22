const passport = require('passport');
const User = require('../models').User;;
const usersService = require('../services/users.service')({
    modelService: User
});
const responses = require('../models/responses');

module.exports = usersController;

function usersController(){
    return {
        //login: login,
        register: register,
        getAll: getAll,
        update: update,
        remove: remove
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

    function update(req, res) {
        const queryCondition = {
            id: req.params.id
        }
        const amendments = req.body;
        usersService.update(queryCondition, amendments)
        .then((user)=>{
            const responseModel = new responses.SuccessResponse()
            responseModel.item = user;
            res.status(200).json(responseModel);
        })
        .catch((err)=> {
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