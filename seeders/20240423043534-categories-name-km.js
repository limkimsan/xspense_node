'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // We wrap the update logic in a transaction using queryInterface.sequelize.transaction.
    // This ensures that all the updates are committed or rolled back together, maintaining data integrity
    await queryInterface.sequelize.transaction(async (transaction) => {
      const categories = await queryInterface.sequelize.query('SELECT id, name FROM Categories', {
        transaction
      });

      for (const category of categories[0]) {
        await queryInterface.bulkUpdate('Categories',
          { name_km: category.name },
          { id: category.id }   // condition to match records to be updated
        );
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
