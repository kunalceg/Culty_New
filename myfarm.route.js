var express = require("express");
var controller = require("../controllers/myfarm.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatemyfarm", controller.cultyvatemyfarm);

module.exports = router;
