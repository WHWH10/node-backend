const AWS = require("aws-sdk");
const logger = require("../../config/customLogger");
// const logger = require("../../config/customLogger");
// const logger = require("../../config/logger");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");

const getMainCategory = async (req, res) => {
  const s3 = new AWS.S3({
    endpoint: endpoint,
    region: "kr-standard",
    credentials: {
      accessKeyId: process.env.NAVER_CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.NAVER_CLOUD_SECRET_KEY,
    },
  });
  //   const params = {
  //     Bucket: process.env.NAVER_CLOUD_BUCKET_NAME,
  //     Delimiter: "/",
  //     MaxKeys: 300,
  //   };

  //   let list;

  try {
    await s3
      .listObjectsV2(params)
      .promise()
      .then((result) => {
        // console.log(result);
        let list = [];
        for (let i = 0; i < result.CommonPrefixes.length; i++) {
          list.push(result.CommonPrefixes[i].Prefix.split("/")[0]);
        }
        console.log(list);
        logger.appLogger().log({
          level: "info",
          message: list,
        });
        return res.json({
          ResultCode: 200,
          ResultMessage: list,
        });
      })
      .catch((err) => {
        return res.json({
          ResultCode: 400,
          ResultMessage: err.toString(),
        });
      });
  } catch (err) {
    console.log(`getMainCategory -- ${err}`);
    logger.appLogger().log({
      level: "error",
      message: err,
    });
    return res.json({
      ResultCode: 400,
      ResultMessage: err.toString(),
    });
    // logger.error(err);
  }
};

module.exports = {
  getMainCategory,
};
