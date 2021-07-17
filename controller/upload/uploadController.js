const logger = require("../../config/customLogger");
const multer = require("multer");
const AWS = require("aws-sdk");

const mongoController = require("../mongo/MongodbController");
const { param } = require("../../routes/upload/upload");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage: storage }).array("files", 10);

// Upload 메인 GET
const getUploadMain = (req, res) => {
  try {
    logger.appLogger().log({
      level: "info",
      message: "get upload succces",
    });
    return res.json({
      ResultCode: 200,
      ResultMessage: "Upload GET Success",
    });
  } catch (err) {
    logger.appLogger().log({
      level: "error",
      message: "get upload " + err,
    });
    return res.json({
      ResultCode: 400,
      ResultMessage: err.toString(),
    });
  }
};

// 파일 업로드 -> Object Storage
// if Storage Save Success -> save to mongodb
const postUploadFile = (req, res) => {
  // location - 저장할 경로
  // if(일반/CA/EEG/김학진/activity_my_list.xml)
  //   let fileName = req.body.fileName;
  const location = req.query.location;
  const files = req.files;
  const author = req.query.userId;

  console.log(`Author : ${author}`);
  let resultParams = [];
  // const s3 = new AWS.S3({
  //   endpoint: new AWS.Endpoint(process.env.NAVER_CLOUD_END_POINT),
  //   region: "kr-standard",
  //   credentials: {
  //     accessKeyId: process.env.NAVER_CLOUD_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.NAVER_CLOUD_SECRET_KEY,
  //   },
  // });

  if (files.length == 0) {
    return res.json({
      ResultCode: 400,
      ResultMessage: "There is no Upload Files",
    });
  } else {
    let resultPromise = files.map((item) => {
      let params = {
        Bucket: process.env.NAVER_CLOUD_BUCKET_NAME,
        Key: location + item.originalname,
        Body: item.buffer,
        ACL: "public-read",
      };
      resultParams.push(params);
      return uploaFile(params)
        .then((result) => {
          //   resultData.push(result);
          return result;
        })
        .catch((err) => {
          return res.json({
            ResultCode: 400,
            ResultMessage: err.toString(),
          });
        });
    });

    Promise.all(resultPromise)
      .then((result) => {
        // result.map((item) => {
        //   // console.log(`?? item ${item}`);
        //   mongoController.saveMongo(result);
        // });
        //   console.log(`?? ${result}`);
        // 몽고디비에 저장
        //   mongoController.saveFiles(result, resultParams);
        if (mongoController.saveMongo(result, author, location)) {
          return res.json({
            ResultCode: 200,
            // ResultMessage: resultParams,
            ResultMessage: result,
          });
        } else {
          return res.json({
            ResultCode: 200,
            ResultMessage: "The Upload is Failed.Try Again",
          });
        }
      })
      .catch((err) => {
        logger.appLogger().log({
          level: "error",
          message: "UploadFiles " + err,
        });
        return res.json({
          ResultCode: 400,
          ResultMessage: err.toString(),
        });
      });
  }
};

function uploaFile(params) {
  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.NAVER_CLOUD_END_POINT),
    region: "kr-standard",
    credentials: {
      accessKeyId: process.env.NAVER_CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.NAVER_CLOUD_SECRET_KEY,
    },
  });

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(`여기서 해야하나 ? ${data.Key}`);
        console.log(`HEre ?/ ${params}`);
        resolve(data);
      }
    });
  });
}

module.exports = { getUploadMain, postUploadFile, upload };
