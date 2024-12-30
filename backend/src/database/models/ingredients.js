'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ingredients.init({
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ingredients',
    hooks: {
      beforeCreate: (ingredient, options) => {
        if (ingredient.name) {
          ingredient.name = ingredient.name.trim().toLowerCase();
        }
      },
      beforeBulkCreate: (ingredients, options) => {
        ingredients.forEach(ingredient => {
          if (ingredient.name) {
            ingredient.name = ingredient.name.trim().toLowerCase();
          }
        });
      },
      beforeUpdate: (ingredient, options) => {
        if (ingredient.name) {
          ingredient.name = ingredient.name.trim().toLowerCase();
        }
      },
      beforeBulkUpdate: (options) => {
        if (options.fields.includes('name')) {
          if (options.attributes.name) {
            options.attributes.name = options.attributes.name.trim().toLowerCase();
          }
        }
      }
    }
  });

  return ingredients;
};
