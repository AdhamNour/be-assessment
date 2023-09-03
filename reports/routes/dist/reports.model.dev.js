"use strict";

var _express = require("express");

var reportRouter = (0, _express.Router)();
reportRouter.get('/', function (req, res) {
  return res.send("no group");
});