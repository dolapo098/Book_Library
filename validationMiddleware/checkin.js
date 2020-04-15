const { check, validationResult } = require("express-validator");

function validateInputs() {
  return [
    check("checkOutid").isNumeric().notEmpty(),
    check("id").isNumeric().notEmpty(),
    check("noOfDays").isNumeric().notEmpty(),
    check("penaltyFee").isNumeric()
  ];
}

function setErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
}

module.exports = {
  validateInputs: validateInputs,
  setErrors: setErrors
};






checkOutId: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to thr Book model
      model: checkout,
      key: "id",
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  noOfDays: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  penaltyFee: {
    type: Sequelize.INTEGER,