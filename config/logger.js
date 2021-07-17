var winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const fs = require("fs");
const { combine, timestamp, printf } = winston.format;

const defaultDir = "/Users/eunji/vscode_workspace/hyd_workspace/logs/default";
const errorDir = "/Users/eunji/vscode_workspace/hyd_workspace/logs/error";

// if (!fs.existsSync(defaultDir)) {
//   fs.mkdirSync(defaultDir);
// }

// if (!fs.existsSync(errorDir)) {
//   fs.mkdirSync(errorDir);
// }

const logFormat = printf(({ timestamp, level, message, stack }) => {
  if (stack) return `${timestamp} ${level} - ${message}\n${stack}`;
  else return `${timestamp} ${level} - ${message}`;
});

var logger = winston.createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }), logFormat),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: defaultDir,
      filename: `app.%DATE%.log`,
      maxFiles: 10,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: errorDir,
      filename: `error.%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// const stream = {
//   write: (message) => {
//     logger.info(message);
//   },
// };

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize()),
    })
  );
}

module.exports = { logger };
