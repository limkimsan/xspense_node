'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Categories',
      'name_km',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'name_km');
  }
};
