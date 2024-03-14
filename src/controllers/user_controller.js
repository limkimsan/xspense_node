const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const userConst = require('../constants/user_constant');

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.render('users/index', {
        path: '/users',
        users: users,
        roles: ['primary admin', 'admin', 'normal'],
        message: '',
        messageType: ''
      });
    });
}

exports.getCreateUser = (req, res, next) => {
  res.render('users/new', {
    path: '/users',
    isEdit: false,
    oldInput: {
      name: '',
      email: ''
    },
    message: '',
    messageType: ''
  })
}

exports.postCreateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return res.render('users/new', {
      path: '/users',
      oldInput: {
        name: req.body.name,
        email: req.body.email == '@' ? '' : req.body.email
      },
      message: message,
      messageType: 'error'
    });
  }

  bcrypt.hash(req.body.password, 12)
    .then(hashedPwd => {
      return User.create({
        id: crypto.randomUUID(),
        name: req.body.name || '',
        email: req.body.email,
        password: hashedPwd,
        role: userConst.role.normal
      });
    })
    .then(user => {
      if (req.route.path != '/signup') {
        return res.redirect('/users');
      }

      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        res.redirect('/');
      });
    })
    .catch(err => {
      res.redirect('/signup');
    })
}

exports.getEditUser = (req, res, next) => {
  console.log('== query = ', req.query);
  const userId = req.params.userId;
  User.findOne({
    where: { id: req.params.userId }
  })
  .then(user => {
    if (!user)
      return res.redirect('/users');

    return user.dataValues;
  })
  .then(user => {
    console.log('== edit user = ', user)
    res.render('users/edit', {
      path: '/users',
      isEdit: true,
      oldInput: {
        name: user.name,
        email: user.email,
      },
      message: '',
      messageType: ''
    });
  })
}