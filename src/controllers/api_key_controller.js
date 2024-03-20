const crypto = require('crypto');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const ApiKey = require('../../models/apikey');

exports.getApiKeys = (req, res, next) => {
  const query = !req.params.archived ? { [Op.eq]: null } : { [Op.ne]: null };
  ApiKey.findAll({ where: { deletedAt: query }, paranoid: false })
    .then(apiKeys => {
      res.render('apiKeys/index', {
        path: '/api-keys',
        apiKeys: apiKeys,
        archived: !!req.params.archived ? true : false,
        message: '',
        messageType: ''
      });
    });
}

exports.getCreateApiKey = (req, res, next) => {
  res.render('apiKeys/new', {
    path: '/api-keys',
    isEdit: false,
    name: '',
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
    activated: true,
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

exports.getEditApiKey = (req, res, next) => {
  ApiKey.findOne({ where: { id: req.params.apiKeyId } })
    .then(apiKey => {
      if (!apiKey)
        return res.redirect('/api-keys');

      return apiKey.dataValues;
    })
    .then(apiKey => {
      res.render('apiKeys/edit', {
        path: '/api-keys',
        isEdit: true,
        apiKeyId: req.params.apiKeyId,
        name: apiKey.name,
        message: '',
        messageType: ''
      })
    })
}

exports.postEditApiKey = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() && !req.params.activated) {
    const message = errors.array()[0].msg;
    return res.render('apiKeys/edit', {
      path: '/api-keys',
      isEdit: true,
      apiKeyId: req.params.apiKeyId,
      name: req.body.name,
      message: message,
      messageType: 'error'
    });
  }
  
  let params = {};
  if (!!req.body.name)
    params = { name: req.body.name }
  else if (!!req.params.activated)
    params = { activated: req.params.activated === 'false' ? true : false }

  ApiKey.update(params, { where: { id: req.params.apiKeyId } })
  .then(apiKey => {
    res.redirect('/api-keys');
  })
  .catch(err => {
    return res.render('apiKeys/edit', {
      path: '/api-keys',
      isEdit: true,
      apiKeyId: req.params.apiKeyId,
      name: req.body.name,
      message: 'Failed to edit the API key!',
      messageType: 'error'
    });
  })
}

exports.postArchiveApiKey = (req, res, next) => {
  ApiKey.destroy({ where: { id: req.params.apiKeyId } })
    .then(response => {
      res.status(200).json({ message: 'Delete API key success!' });
    })
}

exports.postRestoreApiKey = (req, res, next) => {
  ApiKey.restore({ where: { id: req.params.apiKeyId } })
  .then(response => {
    res.status(200).json({ message: 'Restore API key success!' });
  });
}