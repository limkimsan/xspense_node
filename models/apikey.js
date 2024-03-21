'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ApiKey extends Model {}

module.exports = ApiKey.init({
  id: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  apiKey: DataTypes.STRING,
  activated: DataTypes.BOOLEAN,
  deletedAt: DataTypes.DATE,
  userId: DataTypes.UUID
}, {
  sequelize,
  paranoid: true,
  modelName: 'ApiKey',
});

module.exports = ApiKey;