const express = require("express");
const router = express.Router();
const { languageinfo, language } = require("./controller");

router.get("/languageinfo", languageinfo);

router.get("/language", language);

const errorHandler = (error) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  return error;
};

module.exports = router;
