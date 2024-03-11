const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('xspense-track', 'root', 'MySql@2024', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;