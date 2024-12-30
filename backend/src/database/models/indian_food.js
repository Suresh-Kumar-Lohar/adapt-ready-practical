'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class indian_food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      indian_food.hasMany(models.food_ingredients, {
        foreignKey: "foodId",
        targetKey: "id",
        as: "foodIngredients"
      })
    }
  }
  indian_food.init({
    name: DataTypes.STRING,
    dietType: DataTypes.STRING,
    prepTime: DataTypes.STRING,
    cookTime: DataTypes.INTEGER,
    flavourProfile: DataTypes.ENUM("bitter", "sour", "spicy", "sweet"),
    courseType: DataTypes.ENUM("dessert", "main-course", "starter", "snack"),
    state: DataTypes.STRING,
    region: DataTypes.ENUM("east", "west", "north", "south", "north-east", "central"),
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'indian_food',
  });
  return indian_food;
};