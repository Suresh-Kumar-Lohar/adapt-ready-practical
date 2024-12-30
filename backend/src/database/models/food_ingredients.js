'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food_ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      food_ingredients.belongsTo(models.ingredients, {
        foreignKey: "ingredientId",
        targetKey: "id"
      })
    }
  }
  food_ingredients.init({
    foodId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'food_ingredients',
  });
  return food_ingredients;
};