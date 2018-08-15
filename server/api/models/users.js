const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usersSchema = new Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    stateOfResidence: {
        type: String,
    },
    country:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    local: {
        email: {
            type: String,
            // required: true
        },
        password: {
            type: String,
            // required: true
        }
    },
});

// methods ======================
usersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

usersSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
};

module.exports = mongoose.model('Users', usersSchema);