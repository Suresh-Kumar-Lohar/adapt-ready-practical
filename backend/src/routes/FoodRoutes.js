const express = require('express');
const router = express.Router();
const validate = require("../middlewares/validator.js");
const FoodValidator = require("../middlewares/Validators/FoodValidator.js");
const FoodController = require('../controllers/FoodController');

router.get(
  '/list-items',
  validate(FoodValidator.getFoodItemsListValidation),
  FoodController.getFoodItemsList
);

router.get(
  '/details',
  validate(FoodValidator.getFoodDetailValidation),
  FoodController.getFoodDetail
);

router.get(
  '/get-ingredients',
  validate(FoodValidator.getAllIngredientsValidation),
  FoodController.getAllIngredients
);

module.exports = router;
