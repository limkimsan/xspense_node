const Category = require('../../models/category');
const transConst = require('../constants/user_constant');

exports.getCategories = (req, res, next) => {
  Category.findAll()
    .then(categories => {
      res.render('categories/index', {
        path: '/categories',
        categories: categories,
        message: '',
        messageType: ''
      });
    });
}

exports.getCreateCategory = (req, res, next) => {
  res.render('categories/new', {
    path: '/categories',
    isEdit: false,
    transactionTypes: {income: 0, expense: 1},
    oldInput: {
      name: '',
    },
    message: '',
    messageType: ''
  });
}