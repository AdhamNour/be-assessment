"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertionValidator = exports.authenticationValidator = exports.notNullValidator = void 0;
var checkNotNullAttributes = ["name", "url", "protocol", "ignoreSSL"];
var notNullValidator = checkNotNullAttributes.map(function (attr) {
  return function (req, res, next) {
    var value = req.body[attr];

    if (value) {
      next();
    } else {
      res.status(400).json({
        message: attr + " is mandatory attribute to complete sign up request"
      });
    }
  };
});
exports.notNullValidator = notNullValidator;

var authenticationValidator = function authenticationValidator(req, res, next) {
  var authentication = req.body.authentication;

  if (authentication) {
    var username = authentication.username,
        password = authentication.password;

    if (username && password) {
      req.authentication = authentication;
      return next();
    } else {
      return res.status(400).json({
        message: " username and password are mandatory attribute to complete sign up request"
      });
    }
  }

  next();
};

exports.authenticationValidator = authenticationValidator;

var assertionValidator = function assertionValidator(req, res, next) {
  var assertion = req.body.assertion;

  if (assertion) {
    var statusCode = assertion.statusCode;

    if (statusCode) {
      req.assertion = assertion;
      return next();
    } else {
      return res.status(400).json({
        message: " username and password are mandatory attribute to complete sign up request"
      });
    }
  }

  next();
};

exports.assertionValidator = assertionValidator;