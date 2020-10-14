const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    check("name").notEmpty(),
    check("email").isEmail(),
    check("password").notEmpty().isLength({ min: 5 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    error: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
