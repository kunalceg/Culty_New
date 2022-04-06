var express = require("express");
var controller = require("../controllers/gateway.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvategateway", controller.cultyvategateway);

module.exports = router;
