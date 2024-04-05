const ApiKey = require('../models/apikey');
const User = require('../models/user');
const Category = require('../models/category');
const Transaction = require('../models/transaction');

const modelsAssociation = () => {
  Transaction.belongsTo(Category);
  Transaction.belongsTo(User);

  ApiKey.belongsTo(User);

  User.hasMany(Transaction);
  User.hasMany(ApiKey);

  Category.hasMany(Transaction);
}

module.exports = modelsAssociation;