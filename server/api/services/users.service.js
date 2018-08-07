module.exports = usersService;

function usersService (options) {
    let Users;

    if (!options.modelService) {
        throw new Error('Options.modelService is required');
    }

    Users = options.modelService;

    return {
        getAll: getAll,
        insert: insert,
        //update: update,
        remove: remove,
    };

    function getAll () {
        return User.find();
    }

    function insert (document) {
        let user = new Users(document);
        user.local.password = user.generateHash(user.local.password);
        return user.save();
    }
    function remove (queryCondition) {
        return Users.findOneAndRemove(queryCondition);
    }
}