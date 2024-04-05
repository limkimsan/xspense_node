'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      currencyType: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.STRING
      },
      transactionType: {
        type: Sequelize.INTEGER
      },
      transactionDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID
      },
      categoryId: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('Transactions');
  }
};