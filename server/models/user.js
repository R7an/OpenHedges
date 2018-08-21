const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: true
    },
    stateOfResidence: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: true
    }
  });

  User.prototype.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  };

  return User;
};