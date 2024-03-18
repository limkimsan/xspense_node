const crypto = require('crypto');
const { validationResult } = require('express-validator');

const ApiKey = require('../../models/apikey');

exports.getApiKeys = (req, res, next) => {
  ApiKey.findAll()
    .then(apiKeys => {
      res.render('apiKeys/index', {
        path: '/api-keys',
        apiKeys: apiKeys,
        archived: false,
        message: '',
        messageType: ''
      });
    });
}

exports.getCreateApiKey = (req, res, next) => {
  res.render('apiKeys/new', {
    path: '/api-keys',
    message: '',
    messageType: ''
  });
}

exports.postCreateApiKey = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return res.render('apiKeys/new', {
      path: '/api-keys',
      message: message,
      messageType: 'error'
    });
  }

  ApiKey.create({
    id: crypto.randomUUID(),
    name: req.body.name,
    activated: false,
    apiKey: crypto.randomBytes(16).toString('hex'),
    userId: req.session.user.id
  })
  .then(apiKey => {
    res.redirect('/api-keys');
  })
  .catch(err => {
    res.render('apiKeys/new', {
      path: '/api-keys',
      message: 'Failed to create API key!',
      messageType: 'error'
    });
  })
}