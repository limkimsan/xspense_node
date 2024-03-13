const express = require('express');

const isAuth = require('../middlewares/is_auth');

const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
  res.render('index');
});

module.exports = router;