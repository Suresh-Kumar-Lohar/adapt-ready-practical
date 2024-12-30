const IndianFood = require("../database/models").indian_food;
const Ingredients = require("../database/models").ingredients;
const FoodIngredient = require("../database/models").food_ingredients;

class ScriptService {
  async importDataToIndianFood(foodData) {
    return IndianFood.bulkCreate(foodData);
  }

  async importDataToIngredients(data) {
    return Ingredients.bulkCreate(data);
  }

  async importFoodIngredients(data) {
    return FoodIngredient.bulkCreate(data);
  }

  async findIngredients(filter = {}) {
    let whereCondition = {
      ...filter,
      deletedAt: null
    }
    return Ingredients.findAll({
      where: whereCondition,
    })
  }

  async findFoods(filter = {}) {
    let whereCondition = {
      ...filter,
      deletedAt: null
    }
    return IndianFood.findAll({
      where: whereCondition,
    })
  }
}

module.exports = new ScriptService();