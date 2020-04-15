const { createLogger, transports, format } = require("winston");
const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      name: "info-file",
      filename: "info.log",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const errors = createLogger({
  transports: [
    new transports.Console({
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      name: "error-file",
      filename: "error.log",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const databasErrors = createLogger({
  transports: [
    new transports.Console({
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      name: "error-file",
      filename: "error.log",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = {
  logger: logger,
  errors: errors,
  databasErrors: databasErrors,
};
