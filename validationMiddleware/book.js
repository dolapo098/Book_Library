const { check, validationResult } = require("express-validator");

//Check for User inputs
function validateInputs() {
  return [
    // check("id", "id is required in numbers").isNumeric().not().isEmpty(),
    check("title", "title is required in String format")
      .isString()
      .not()
      .isEmpty(),
    check("isbn", "isbn is required in numbers")
      .isNumeric()
      .isLength({ max: 7 })
      .not()
      .isEmpty(),
    check("publishYear", "publishYear").not().isEmpty(),
    check("coverPrice", "coverPrice is required in numbers")
      .isNumeric()
      .not()
      .isEmpty(),
    check("quantity", "quantity is required in numbers").isNumeric(),
    check("status", "status is required in string format")
      .isString()
      .not()
      .isEmpty(),
  ];
}

//Display validation errors if any
function setErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
}

module.exports = {
  validateInputs: validateInputs,
  setErrors: setErrors,
};
