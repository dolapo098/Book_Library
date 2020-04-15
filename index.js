const express = require("express");
const app = new express();
const DB = require("./db/dbConnect");
const adminRoute = require("./routes/admin");
const bookRoute = require("./routes/book");
const logger = require("./Logging/log").logger;

//connect database
DB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define environment port
const port = process.env.PORT || 4000;

//middleware to call admin route
app.use("/api/admin", adminRoute);

//middleware to call book routes
app.use("/api/books", bookRoute);

app.listen(port, () => {
  logger.log("info", `Server running on port ${port}`);
  logger.remove("info-file");
});
