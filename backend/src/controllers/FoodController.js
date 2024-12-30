const { Op } = require('sequelize');
const FoodService = require('../services/FoodService');

class FoodController {
  async getFoodItemsList(req, res) {
    try {
      const { search, orderBy, sortBy, dietType, flavourType, state, ingredients, page, limit } = req.query;
      const offset = Number(page - 1) * Number(limit);
      let orderOfField = orderBy || "ASC";
      let sortByField = sortBy || "name";
      let whereCondition = [{ deletedAt: null }];

      if (search) {
        whereCondition.push({
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { state: { [Op.like]: `%${search}%` } },
            { region: { [Op.like]: `%${search}%` } },
          ]
        })
      }

      if (dietType) {
        whereCondition.push({ dietType: { [Op.like]: `%${dietType}%` } });
      }
      if (flavourType) {
        whereCondition.push({ flavourProfile: { [Op.like]: `%${flavourType}%` } });
      }
      if (state) {
        whereCondition.push({ state: { [Op.like]: `%${state}%` } });
      }

      let foodList = [];
      if (ingredients && ingredients.length > 0) {
        const fetchFoodUsingIngredients = await FoodService.fetchFoodUsingIngredients(ingredients);
        if (fetchFoodUsingIngredients && fetchFoodUsingIngredients.length > 0) {
          whereCondition.push({ id: { [Op.in]: fetchFoodUsingIngredients } })
        } else {
          return res.handler.success("Food list has been fetched successfully!", foodList);
        }
      }

      foodList = await FoodService.listIndianFoods(whereCondition, sortByField, orderOfField, offset, Number(limit));
      return res.handler.success("Food list has been fetched successfully!", foodList);

    } catch (error) {
      console.log("🚀 ~ FoodController ~ getFoodItemsList ~ error:", error)
      return res.handler.internalServerError('Internal Server error!');
    }
  }

  async getFoodDetail(req, res) {
    try {
      const { dishId } = req.query;
      const foodDetails = await FoodService.fetchFoodDetail({ id: dishId });
      return res.handler.success("Food details has been fetched successfully!", foodDetails);
    } catch (error) {
      console.log("🚀 ~ FoodController ~ getFoodDetail ~ error:", error)
      return res.handler.internalServerError('Internal Server error!');
    }
  }

  async getAllIngredients(req, res) {
    try {
      const ingredientList = await FoodService.fetchAllIngredients();
      return res.handler.success("Ingredient list has been fetched successfully!", ingredientList);
    } catch (error) {
      console.log("🚀 ~ FoodController ~ getAllIngredients ~ error:", error)
      return res.handler.internalServerError('Internal Server error!');
    }
  }
}

module.exports = new FoodController();