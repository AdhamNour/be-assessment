"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checksRouter = void 0;

var _express = require("express");

var _checksController = require("../controller/checksController.js");

var _checkValidator = require("../controller/checkValidator.js");

var checksRouter = (0, _express.Router)();
exports.checksRouter = checksRouter;
checksRouter.get('/', _checksController.getAllChecks);
checksRouter.post('/', _checkValidator.notNullValidator, _checkValidator.authenticationValidator, _checkValidator.assertionValidator, _checksController.createCheck);
checksRouter.get('/:id', _checksController.getCheckById);
checksRouter.put('/:id', function (req, res) {
  res.send("this is id of target check " + req.params.id);
});
checksRouter["delete"]('/:id', _checksController.deleteCheck);