'use strict';
let data = require('../products.json');

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
   let products = data.map(el =>{
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    el.authorMongoId = "6384e6674fa12e3e76e1a389"
    return el
   })
   await queryInterface.bulkInsert("Products", products, {})
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
