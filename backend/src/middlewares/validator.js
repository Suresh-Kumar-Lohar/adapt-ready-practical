const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.handler.badRequest(error.details[0].message)
    }
    next();
  }
}

module.exports = validate;