var express = require("express");
var controller = require("../controllers/login.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatelogin", controller.cultyvatelogin);

module.exports = router;