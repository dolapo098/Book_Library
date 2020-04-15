"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      isbn: DataTypes.NUMERIC,
      publishYear: DataTypes.DATE,
      coverPrice: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {}
  );
  Book.associate = function (models) {
    Book.hasMany(models.User);
    // associations can be defined here
  };
  return Book;
};
