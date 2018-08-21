

module.exports = usersService;

function usersService(options) {
    let User;

    if (!options.modelService) {
        throw new Error('Options.modelService is required');
    }

    User = options.modelService;

    return {
        getAll: getAll,
        insert: insert,
        update: update,
        remove: remove,
    };

    function getAll() {
        return User.find();
    }

    function insert(document) {
        let user = new User(document);
        user.local.password = user.generateHash(user.local.password);
        return user.create()
            // .then(user => res.status(201).send(user))
            // .catch(error => res.status(400).send(error));
    }
    function remove(queryCondition) {
        return Users.findOneAndRemove(queryCondition);
    }
    function update(queryCondition, amendments) {
        return Users.findByIdAndUpdate(queryCondition._id, { $set: amendments }, { new: true });
    }
}