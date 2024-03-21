'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

module.exports = User.init({
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

User.associate = (models) => {
  User.hasMany(models.apikeys);
  User.hasMany(models.transactions);
}

module.exports = User;