const { check, body } =  require('express-validator');

const User = require('../../models/user');

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

exports.validateEditUser = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } })
          .then(user => {
            if (!!user && user.id != req.params.userId)
              throw new Error('Email is already existed');
          })
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

exports.validateCategory = () => {
  return [
    body('name')
      .isString()
      .notEmpty()
      .withMessage('Please enter the category name'),
    body('icon')
      .isString()
      .notEmpty()
      .withMessage('Please enter the icon name'),
    body('icon_type')
      .isString()
      .notEmpty()
      .withMessage('Please enter the icon type')
  ]
}

exports.validateApiKey = () => {
  return [
    check('name')
      .isString()
      .notEmpty()
      .withMessage('Please enter the name of the API key')
  ]
}