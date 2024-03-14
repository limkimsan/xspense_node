const { check, body } =  require('express-validator');

const User = require('../models/user');

exports.validateUser = () => {
  return [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } })
          .then(user => {
            if (!!user)
              throw new Error('Email is already existed');
          })
      })
      .normalizeEmail(),
    body('password', 'Please enter a password with only number and text and at least 6 characters.')
      .isLength({min: 6})
      .isAlphanumeric()
      .trim(),
    body('password_confirmation')
      .trim()
      .custom((value, { req }) => {
        if(value != req.body.password)
          throw new Error('Passwords have to match!');

        return true;
      })
  ]
}

exports.validateLogin = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail()
      .notEmpty(),
    body('password')
      .trim()
      .notEmpty()
  ]
}