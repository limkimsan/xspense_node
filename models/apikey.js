'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  paranoid: true,
  modelName: 'ApiKey',
});

ApiKey.associate = function(models) {
  ApiKey.belongsTo(models.User)
}

module.exports = ApiKey;