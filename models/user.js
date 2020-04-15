"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      bookId: DataTypes.INTEGER,
      userName: DataTypes.STRING,
      email: DataTypes.INTEGER,
      ninNo: DataTypes.NUMERIC,
      checkoutDate: DataTypes.DATE,
      expectedDate: DataTypes.DATE,
      removedBooks: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    User.belongsTo(models.Book);
    // associations can be defined here
  };
  return User;
};
