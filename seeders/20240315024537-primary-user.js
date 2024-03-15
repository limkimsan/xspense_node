'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userConst = require('../src/constants/user_constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await bcrypt.hash('12345678', 12)
      .then(async (hashedPwd) => {
        await queryInterface.bulkInsert('Users', [{
          id: crypto.randomUUID(),
          name: 'Admin',
          email: 'admin@xspense.com',
          password: hashedPwd,
          role: userConst.role.primary_admin,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
