const express = require('express');

const isAuth = require('../middlewares/is_auth');
const userController = require('../controllers/user_controller');
const categoryController = require('../controllers/category_controller');
const apiKeyController = require('../controllers/api_key_controller');
const { validateUser, validateEditUser, validateCategory, validateApiKey } = require('../middlewares/validation');

const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
  res.render('home/index', {
    path: '',
    message: '',
    messageType: ''
  });
});

router.get('/users', isAuth, userController.getUsers);

router.get('/users/new', isAuth, userController.getCreateUser)

router.post('/users/new', isAuth, validateUser(), userController.postCreateUser)

router.get('/users/:userId', isAuth, userController.getEditUser)

router.post('/users/:userId', isAuth, validateEditUser(), userController.postEditUser);

router.get('/categories', isAuth, categoryController.getCategories);

router.get('/categories/new', isAuth, categoryController.getCreateCategory);

router.post('/categories/new', isAuth, validateCategory(), categoryController.postCreateCategory);

router.get('/categories/:categoryId', isAuth, categoryController.getEditCategory);

router.post('/categories/:categoryId', isAuth, categoryController.postEditCategory);

router.post('/delete-categories/:categoryId', isAuth, categoryController.deleteCategory);

router.get('/api-keys/:archived?', isAuth, apiKeyController.getApiKeys);

router.get('/api-keys/new', isAuth, apiKeyController.getCreateApiKey);

router.post('/api-keys/new', isAuth, validateApiKey(), apiKeyController.postCreateApiKey);

router.get('/api-keys/:apiKeyId', isAuth, apiKeyController.getEditApiKey);

router.post('/api-keys/:apiKeyId/:activated?', isAuth, validateApiKey(), apiKeyController.postEditApiKey);

router.post('/archive-api-keys/:apiKeyId', isAuth, apiKeyController.postArchiveApiKey);

router.post('/restore-api-keys/:apiKeyId', isAuth, apiKeyController.postRestoreApiKey);

module.exports = router;