var express = require("express");
var controller = require("../controllers/farmlandinfo.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatefarmlandinfo", controller.cultyvatefarmlandinfo);

module.exports = router;
