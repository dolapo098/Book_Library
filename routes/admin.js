const express = require("express");
const router = express.Router();
const Book = require("../models").Book;
const logger = require("../Logging/log").logger;
const errors = require("../Logging/log").errors;
const adminValidator = require("../validationMiddleware/book").validateInputs;
const validationError = require("../validationMiddleware/book").setErrors;

// Express validator tocheck for clients input errors
router.use(adminValidator(), validationError);

// @route      post add books
// @desc       admin route
// @access     private
router.post("/addBooks", async (req, res) => {
  try {
    // console.log((req.headers.authorization = "admin"));
    const {
      id,
      title,
      isbn,
      publishYear,
      coverPrice,
      quantity,
      status,
    } = req.body;
    const isIsbnUnique = await Book.findOne({ where: { isbn } });
    if (req.headers.authorization !== "Admin") {
      res.status(403).send(`User is unauthorised to post book list`);
      errors.log(
        "error",
        ` Forbidden : User is unauthorised to post book list`
      );
    } else if (isIsbnUnique) {
      //Check for a unique constraint with isbnNo
      errors.log(
        "error",
        ` Forbidden : Book with isbn no: ${isbn}already exist`
      );
      errors.log(
        "error",
        ` Forbidden : Book with isbn no: ${isbn}already exist`
      );
      res.status(403).send(`Book with isbn no: ${isbn} already exist`);
    } else {
      const book = await Book.create({
        id,
        title,
        isbn,
        publishYear,
        coverPrice,
        quantity,
        status,
      });
      res.status(200).json({ book });
      logger.info("info", book.get({ plain: true }));
    }
  } catch (err) {
    errors.log("error", `${err.message} ${err.stack}`);
  }
});

router.get("/findBooks", async (req, res) => {
  try {
    const books = await Book.findAll();
    console.log(books);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
