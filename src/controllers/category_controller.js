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