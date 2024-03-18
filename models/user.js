'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiKey = require('./apikey');

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here 
  }
}
User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'User',
});

User.associate = function(models) {
  User.hasMany(models.ApiKey);
}

module.exports = User;