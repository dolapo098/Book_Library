const { check, validationResult } = require("express-validator");

function validateInputs() {
  return [
    check("bookId").isNumeric().notEmpty(),
    check("Id").isNumeric().notEmpty(),
    check("userName").isString().notEmpty(),
    check("email").isString().notEmpty(),
    check("ninNo").isNumeric().isLength({ max: 7 }).notEmpty(),
    check("checkOutDate").notEmpty(),
    check("expectedDate").isDecimal().notEmpty(),
    check("checkOutBooks").isNumeric(),
  ];
}

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
