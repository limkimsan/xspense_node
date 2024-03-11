const express = require('express');
const bodyParser = require('body-parser');

// import sequelize from './utils/database';

const app = express();

app.use(bodyParser.json());
// app.listen(3000)

// sequelize
//   .sync()
//   .then((result) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });