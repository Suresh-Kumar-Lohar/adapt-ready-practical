const { Sequelize, where, Op } = require("sequelize");
const IndianFood = require("../database/models").indian_food;
const Ingredients = require("../database/models").ingredients;
const FoodIngredient = require("../database/models").food_ingredients;

class FoodService {
  async listIndianFoods(whereCondition, sortByField, orderOfField, offset, limit, ingredients) {
    return IndianFood.findAndCountAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      where: whereCondition,
      include: {
        model: FoodIngredient,
        as: "foodIngredients",
        attributes: ["id"],
        include: {
          model: Ingredients,
          attributes: ["id", "name"],
        }
      },
      distinct: true,
      order: [[Sequelize.literal(`${sortByField}`), `${orderOfField}`]],
      offset: offset,
      limit: limit,
    })
  }

  async fetchFoodDetail(whereCondition) {
    return IndianFood.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      where: whereCondition,
      include: {
        model: FoodIngredient,
        as: "foodIngredients",
        attributes: ["id"],
        include: {
          model: Ingredients,
          attributes: ["id", "name"],
        }
      }
    })
  }

  async fetchAllIngredients() {
    return Ingredients.findAll({
      attributes: ["id", "name"],
      where: {
        deletedAt: null
      },
      raw: true,
      order: [["name", "ASC"]]
    })
  }

  async fetchFoodUsingIngredients(ingredients) {
    const results = await FoodIngredient.findAll({
      attributes: [
        'foodId',
        [Sequelize.fn('COUNT', Sequelize.col('ingredientId')), 'ingredientCount']
      ],
      group: ['foodId'],
      where: {
        ingredientId: { [Op.in]: ingredients }
      },
      having: Sequelize.literal(`COUNT(ingredientId) = ${ingredients.length}`),
      raw: true
    });

    const foodIds = results.map(result => result.foodId);

    const data = await FoodIngredient.findAll({
      attributes: ['foodId'],
      where: {
        foodId: { [Op.in]: foodIds },
        deletedAt: null
      },
      group: ['foodId'],
      having: Sequelize.literal(`COUNT(foodId) = ${ingredients.length}`),
      raw: true
    });

    return data.map(result => result.foodId);
  }
}

module.exports = new FoodService();
