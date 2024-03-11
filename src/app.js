const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const User = require('./models/user');

const app = express();2

app.use(bodyParser.json());

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });