'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class ApiKey extends Model {}

ApiKey.init({
  id: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  apiKey: DataTypes.STRING,
  activated: DataTypes.BOOLEAN,
  deletedAt: DataTypes.DATE,
  userId: DataTypes.STRING
}, {
  sequelize,
  modelName: 'ApiKey',
});

ApiKey.belongsTo(User);

module.exports = ApiKey;