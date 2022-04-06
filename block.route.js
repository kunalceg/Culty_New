var express = require("express");
var controller = require("../controllers/block.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvateblock", controller.cultyvateblock);

module.exports = router;
