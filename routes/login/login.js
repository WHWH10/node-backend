const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  res.json({
    ResultCode: 200,
    ResultMessage: "Login Get",
  });
});

router.post("", (req, res) => {});
module.exports = router;
