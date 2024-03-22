const crypto = require('crypto');
const { validationResult } = require('express-validator');

const Category = require('../../models/category');

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
    oldInput: {
      name: '',
      transaction_type: null,
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

const renderCategoryForm = (path, req, res, message, messageType) => {
  res.render(path, {
    path: '/categories',
    isEdit: false,
    oldInput: {
      name: req.body.name,
      transaction_type: req.body.transaction_type,
      order: req.body.order,
      icon: req.body.icon,
      icon_type: req.body.icon_type,
      icon_color: req.body.icon_color,
      background_color: req.body.bg_color
    },
    message: message,
    messageType: 'error'
  });
}

exports.postCreateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    renderCategoryForm('categories/new', req, res, message, 'error');
  }

  Category.create({
    id: crypto.randomUUID(),
    name: req.body.name,
    transaction_type: parseInt(req.body.transaction_type),
    order: parseInt(req.body.order),
    icon: req.body.icon,
    icon_type: req.body.icon_type,
    icon_color: req.body.icon_color,
    bg_color: req.body.bg_color
  })
  .then(category => {
    res.redirect('/categories');
  })
  .catch(err => {
    renderCategoryForm('categories/new', req, res, 'Failed to create category!', 'error');
  });
}

exports.getEditCategory = (req, res, next) => {
  Category.findOne({ where: { id: req.params.categoryId } })
    .then(category => {
      if (!category)
        return res.redirect('/categories');

      return category.dataValues;
    })
    .then(category => {
      res.render('categories/edit', {
        path: '/categories',
        categoryId: req.params.categoryId,
        isEdit: true,
        oldInput: {
          name: category.name,
          transaction_type: category.transaction_type,
          order: category.order,
          icon: category.icon,
          icon_type: category.icon_type,
          icon_color: category.icon_color,
          background_color: category.bg_color
        },
        message: '',
        messageType: ''
      });
    })
}

exports.postEditCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    renderCategoryForm('categories/edit', req, res, message, 'error');
  }

  Category.update({
    name: req.body.name,
    transaction_type: parseInt(req.body.transaction_type),
    order: parseInt(req.body.order),
    icon: req.body.icon,
    icon_type: req.body.icon_type,
    icon_color: req.body.icon_color,
    bg_color: req.body.bg_color
  }, { where: { id: req.params.categoryId } })
  .then(cate => {
    res.redirect('/categories');
  })
  .catch(err => {
    renderCategoryForm('categories/edit', req, res, 'Failed to edit the category!', 'error');
  });
}

exports.deleteCategory = (req, res, next) => {
  Category.findOne({ where: { id: req.params.categoryId } })
    .then(category => {
      if (!category)
        return res.status(404).json({ message: 'Delete category failed!' });

      return category.destroy();
    })
    .then(response => {
      res.status(200).json({ message: 'Delete product success!' });
    })
}