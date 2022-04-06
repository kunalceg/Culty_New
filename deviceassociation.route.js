var express = require("express");
var controller = require("../controllers/deviceassociation.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/deviceassociation", controller.deviceassociation);

module.exports = router;
