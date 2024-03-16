'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transaction_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER
      },
      icon: {
        type: Sequelize.STRING
      },
      icon_color: {
        type: Sequelize.STRING
      },
      icon_type: {
        type: Sequelize.STRING
      },
      bg_color: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};