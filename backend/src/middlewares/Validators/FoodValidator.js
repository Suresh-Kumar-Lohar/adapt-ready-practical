const Joi = require('joi');

class FoodValidator {
  getFoodItemsListValidation = Joi.object({
    search: Joi.string().allow('', null).optional(),
    orderBy: Joi.string().valid('ASC', 'DESC').optional(),
    sortBy: Joi.string().allow('', null).optional(),
    dietType: Joi.string().allow('', null).optional(),
    flavourType: Joi.string().allow('', null).optional(),
    state: Joi.string().allow('', null).optional(),
    ingredients: Joi.array().items(Joi.string()).optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
  });

  getFoodDetailValidation = Joi.object({
    dishId: Joi.string().required().messages({
      'any.required': 'Dish ID is required!',
    }),
  });

  getAllIngredientsValidation = Joi.object({});
}

module.exports = new FoodValidator();
