const { validationResult } = require('express-validator');

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
      transaction_type: 0,
      order: '',
      icon: '',
      icon_type: '',
      icon_color: '#000000',
      background_color: '#ffffff'
    },
    message: '',
    messageType: ''
  });
}

exports.postCreateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    res.render('categories/new', {
      path: '/categories',
      isEdit: false,
      transactionTypes: {income: 0, expense: 1},
      oldInput: {
        name: req.body.name,
        transaction_type: req.body.transaction_type,
        order: req.body.order,
        icon: req.body.icon,
        icon_type: req.body.icon_type,
        icon_color: req.body.icon_color,
        background_color: req.body.background_color
      },
      message: message,
      messageType: 'error'
    });
  }
}