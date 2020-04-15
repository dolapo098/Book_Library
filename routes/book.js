const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Book = require("../models").Book;
const User = require("../models").User;
const Op = Sequelize.Op;
const logger = require("../Logging/log").logger;
const errors = require("../Logging/log").errors;

// @route      view books
// @desc       get book by query parameters by 'title' 'publish year
// @access     public
router.get("/viewBook", async (req, res) => {
  const { title, isbn, status } = req.query;
  try {
    if (!title) {
      res.status(400).send(`title is not defined`);
      errors.log("error", `${title}`);
    } else if (!isbn) {
      res.status(400).send(`isbn is not defined`);
      errors.log("error", `${isbn} is not defined`);
    } else if (!status) {
      res.status(400).send(`status is not defined`);
      errors.log("error", `${status} is not defined`);
    }
    const findBook = await Book.findAll({
      where: {
        [Op.and]: [{ title }, { isbn }, { status }],
      },
    });
    if (findBook.length < 1) {
      errors.log("error", `Book does not exist`);
      res.status(400).send("Book does not exist");
    } else {
      res.status(200).json({ findBook });
    }
  } catch (err) {
    errors.log("error", `${err.message}`);
  }
});

// @route      view books
// @desc       soretd by published year in ascending order
// @access     public
router.get("/year", async (req, res) => {
  try {
    const displayBooks = await Book.findAll({
      where: { status: "active" },
      order: [["publishYear", "ASC"]],
      attributes: ["title", "isbn", "coverPrice", "publishYear", "status"],
    });
    if (displayBooks) {
      res.status(200).json({ displayBooks });
    } else if (res.statusCode() >= 500) {
      res.status(500).send("Internal server problem");
    }
  } catch (err) {
    errors.log(
      "error",
      `${err.message}
    ${err.stack}`
    );
  }
});

// @route      view books
// @desc       details of book with checkin/checkout records
// @access     public
router.get("/bookrecords", (req, res) => {});

// @route      checkout book
// @desc       user can checkout with their identification details
// @access     public
router.post("/checkout", async (req, res) => {
  const {
    id,
    bookId,
    userName,
    email,
    ninNo,
    checkoutDate,
    expectedDate,
    removedBooks,
    penaltyFee,
    countDays,
  } = req.body;
  const t = await sequelize.transaction();
  try {
    const checkOutBook = await User.create(
      {
        id,
        bookId,
        userName,
        email,
        ninNo,
        checkoutDate,
        expectedDate,
        removedBooks,
      },
      { transaction: t }
    );
    res.status(200).json({ checkOutBook });
    const updateBookStock = await Book.decrement(
      "quantity",
      { by: removedBooks, where: { id: bookId } },
      { transaction: t }
    );
    logger.info(
      "info",
      ` quantity of books ${updateBookStock} already updated in the book model`
    );
    await t.commit();
  } catch (err) {
    console.log(`${err.message}
    ${err.stack}`);
    await t.rollback();
  }
});

// @route      checkin book
// @desc       user should check in the borrowed book
// @access     private
router.put("/checkin", (req, res) => {});

module.exports = router;
