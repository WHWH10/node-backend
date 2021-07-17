const express = require("express");
const uploadController = require("../../controller/upload/uploadController");

const router = express.Router();

// upload 메인
router.get("", (req, res) => {
  return uploadController.getUploadMain(req, res);
});

// router.post("", uploadController.upload, (req, res) => {
//   // fileName - 파일명
//   // saveLocation - 저장할 경로
//   return uploadController.postUploadFile(req, res);
// });

router.post("", (req, res) => {
  uploadController.upload(req, res, function (err) {
    if (err) {
      return res.json({
        ResultCode: 200,
        ResultMessage: "최대 업로드 파일 수 : 10",
      });
    } else {
      return uploadController.postUploadFile(req, res);
    }
  });
});

module.exports = router;
