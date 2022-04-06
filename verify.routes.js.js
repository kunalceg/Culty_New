var express = require("express");
var controller = require("../controllers/verify.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvateverify", controller.cultyvateverify);

module.exports = router;