const Joi = require('joi');

class AuthValidator {
  async signUpValidation(req) {
    const schema = Joi.object({
      firstName: Joi.string().required().messages({
        "any.required": "First name is required.",
        "string.empty": "First name is required."
      }).trim(),
      lastName: Joi.string().required().messages({
        "any.required": "Last name is required.",
        "string.empty": "Last name is required."
      }).trim(),
      mobile: Joi.number()
        .integer()
        .positive()
        .min(1000000000)
        .max(999999999999999)
        .required()
        .messages({
          "number.base": "Phone number must be a number.",
          "number.positive": "Phone number must be a positive number.",
          "number.min": "Phone number must be at least 10 digits.",
          "number.max": "Phone number must not exceed 15 digits.",
          "any.required": "Phone number is required."
        }).trim(),
      email: Joi.string()
        .email()
        .required()
        .messages({
          "any.required": "Email is required.",
          "string.email": "Email is not valid.",
          "string.empty": "Email is required.",
        }),
      password: Joi.string()
        .required()
        .messages({
          "any.required": "Password is required.",
          "string.empty": "Password is required."
        }),
    });
    return schema.validate(req.body);
  }
}

module.exports = new AuthValidator();