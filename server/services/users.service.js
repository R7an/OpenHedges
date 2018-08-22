

module.exports = usersService;

function usersService(options) {
    let User;

    if (!options.modelService) {
        throw new Error('Options.modelService is required');
    }

    User = options.modelService;

    return {
        insert: insert,
        getById: getById,
        getByEmail: getByEmail,
        update: update,
        remove: remove,
    };

    function getById(id) {
        const queryCondition = {
            where: {
                'id': id
            }
        };
        return User.findOne(queryCondition);
    }

    function getByEmail(email) {
        const queryCondition = {
            where: {
                'email': email
            }
        };
        return User.findOne(queryCondition);
    }

    function insert(document) {
        let user = new User(document);
        user.password = user.generateHash(user.password);
        return User.create(user.dataValues);
    }
    function remove(queryCondition) {
        return User.findOneAndRemove(queryCondition);
    }

    function update(queryParamater, amendments) {
        id = parseInt(queryParamater.id);
        const queryCondition = {
            where: {
                'id': id
            }
        };
        return User.update(amendments, queryCondition);
    }
}