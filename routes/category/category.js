const express = require("express");
const categoryController = require("../../controller/category/category-controller");

const router = express.Router();

// upload 메인
router.get("", (req, res) => {
  return categoryController.getMainCategory(req, res);
});

// 랩실 업로드
router.get("/lab", (req, res) => {
  res.json({
    ResultCode: 200,
    ResultMessage: {
      lab: "lab",
    },
  });
});

// 랩별 카테고리 구분(PA/CA)
router.get("/lab/:category", (req, res) => {
  let category = req.params.category;
  res.json({
    ResultCode: 200,
    ResultMessage: {
      lab: "lab",
      category: category,
    },
  });
});

// 랩별 카테고리 -- Sub Category(fMRI, EEG, 자가진단, 설문, 등)
router.get("/lab/:category/:subcategory", (req, res) => {
  let category = req.params.category;
  let subcategory = req.params.subcategory;

  res.json({
    ResultCode: 200,
    ResultMessage: {
      category: category,
      subcategory: subcategory,
    },
  });
});

// 클리닉 업로드
router.get("/clinic", (req, res) => {
  res.json({
    ResultCode: 200,
    ResultMessage: {
      clinic: "clinic",
    },
  });
});

router.post("", (req, res) => {});

module.exports = router;
