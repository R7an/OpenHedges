const passport = require('../auth/local');
const User = require('../models').User;;
const usersService = require('../services/users.service')({
    modelService: User
});
const responses = require('../models/responses');

module.exports = usersController;

function usersController(){
    return {
        getAll: getAll,
        update: update,
        remove: remove
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