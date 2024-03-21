'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  amount: DataTypes.FLOAT,
  currencyType: DataTypes.INTEGER,
  note: DataTypes.STRING,
  transactionType: DataTypes.INTEGER,
  transactionDate: DataTypes.DATE,
  userId: DataTypes.UUID,
  categoryId: DataTypes.UUID
}, {
  sequelize,
  modelName: 'Transaction',
});

module.exports = Transaction;