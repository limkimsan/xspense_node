const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('xspense-db', 'root', 'MySql@2024', {
  dialect: 'mysql',
  host: 'localhost',
});
export default sequelize;