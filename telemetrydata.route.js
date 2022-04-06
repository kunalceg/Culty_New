var express = require("express");
var controller = require("../controllers/telemetrydata.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/telemetrydata", controller.telemetrydata);

module.exports = router;
