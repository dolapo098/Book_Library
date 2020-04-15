async function DB() {
  try {
    this.Sequelize = require("sequelize");
    const logger = require("../Logging/log").logger;
    this.sequelize = new Sequelize("library", "postgres", "Dolapo@0980", {
      host: "localhost",
      port: "5432",
      dialect: "postgres",
      logging: false,
    });

    //check if connection is okay
    const connection = await sequelize.authenticate();
    logger.log("info", `Database connection has been established successfully`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = DB();
