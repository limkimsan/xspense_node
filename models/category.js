'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  transaction_type: DataTypes.INTEGER,
  order: DataTypes.INTEGER,
  icon: DataTypes.STRING,
  icon_color: DataTypes.STRING,
  icon_type: DataTypes.STRING,
  bg_color: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Category',
});

module.exports = Category;