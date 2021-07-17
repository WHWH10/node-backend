const express = require("express");
const categoryController = require("../../controller/category/categoryController");

const router = express.Router();

// upload 메인
router.get("", (req, res) => {
  return categoryController.getMainCategory(req, res);
});

// 랩별 카테고리 구분(PA/CA)
router.get("/lab", (req, res) => {
  return categoryController.getLabCategory(req, res);
  // res.json({
  //   ResultCode: 200,
  //   ResultMessage: {
  //     lab: "lab",
  //   },
  // });
});

// 랩별 카테고리 -- Sub Category(fMRI, EEG, 자가진단, 설문, 등)
router.get("/lab/:category", (req, res) => {
  return categoryController.getLabSubCategory(req, res);
  // let category = req.params.category;
  // res.json({
  //   ResultCode: 200,
  //   ResultMessage: {
  //     lab: "lab",
  //     category: category,
  //   },
  // });
});

// 랩별 Sub category에 있는 파일 조회
router.get("/lab/:category/:subcategory", (req, res) => {
  return categoryController.getSubCategoryDepth(req, res);
  // let category = req.params.category;
  // let subcategory = req.params.subcategory;

  // res.json({
  //   ResultCode: 200,
  //   ResultMessage: {
  //     category: category,
  //     subcategory: subcategory,
  //   },
  // });
});

// 카테고림별 랩실 파일을 확인
router.get("/lab/:category/:subcategory/:labname", (req, res) => {
  return categoryController.getLabFile(req, res);
});

// 클리닉 업로드
router.get("/clinic", (req, res) => {
  return categoryController.getClinicCategory(req, res);
  // res.json({
  //   ResultCode: 200,
  //   ResultMessage: {
  //     clinic: "clinic",
  //   },
  // });
});

router.post("", (req, res) => {});

module.exports = router;
