'use strict';

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
    const foodList = require('../data/data.json')

    for(let food of foodList) {
      food.createdAt = food.updatedAt = new Date()
      food.additionalInfos = food.additionalInfos.join(", ")
    }

    await queryInterface.bulkInsert('Food', foodList)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Food')
  }
};
