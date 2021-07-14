const express = require("express");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./routes/login/login");
const uploadRouter = require("./routes/upload/upload");
const categoryRouter = require("./routes/category/category");
const { appLogger, httpLogStream } = require("./config/customLogger");
const stream = require("./config/logger");
const morgan = require("morgan");
// const logger = require("./config/customLogger");

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined"; // NOTE: morgan 출력 형
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: path.join(__dirname, "./.env") });
  console.log("production mode");
  console.log(process.env.PORT);
} else {
  // dotenv.config({ path: path.join('/env', './local.env')});
  require("dotenv").config({ path: path.join(__dirname, "./.env.dev") });
  console.log("development mode");
  console.log(process.env.PORT);
}

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/views"));
// app.use(morgan("combined", { stream }));
// app.use(morgan(morganFormat, { stream: logger.httpLogStream })); // NOTE: http request 로그 남기기
app.use(morgan(morganFormat, { httpLogStream }));

// 라우터 설정
app.use("", categoryRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);

app.listen(process.env.PORT, (req, res) => {
  //   appLogger.info("hello");
  appLogger().log({
    level: "info",
    message: "success",
  });
  console.log(`Listening at Prot :: ${process.env.PORT}`);
  console.log(`MONGO_URL : ${process.env.MONGO_URL}`);
});
