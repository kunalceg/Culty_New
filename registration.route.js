var express = require("express");
var controller = require("../controllers/registration.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvateregistration", controller.cultyvateregistration);

module.exports = router;
