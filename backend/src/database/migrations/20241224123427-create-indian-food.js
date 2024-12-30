'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('indian_foods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dietType: {
        type: Sequelize.ENUM("vegetarian", "non-vegetarian"),
        allowNull: false
      },
      prepTime: {
        type: Sequelize.INTEGER,
      },
      cookTime: {
        type: Sequelize.INTEGER,
      },
      flavourProfile: {
        type: Sequelize.ENUM("bitter", "sour", "spicy", "sweet")
      },
      courseType: {
        type: Sequelize.ENUM("dessert", "main-course", "starter", "snack")
      },
      state: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.ENUM("east", "west", "north", "south", "north-east", "central")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('indian_foods');
  }
};