"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCheck = exports.getAllChecks = void 0;

var _AssertionModel = require("../model/Assertion.model.js");

var _authenticationModel = require("../model/authentication.model.js");

var _checkModel = require("../model/check.model.js");

var getAllChecks = function getAllChecks(req, res) {
  var user, checks;
  return regeneratorRuntime.async(function getAllChecks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.user;
          _context.next = 3;
          return regeneratorRuntime.awrap(user.getChecks({
            include: [{
              model: _AssertionModel.CheckAssertion,
              attributes: {
                exclude: ["id", "CheckId"]
              }
            }, {
              model: _authenticationModel.CheckAuthentication,
              attributes: {
                exclude: ["id", "CheckId"]
              }
            }],
            attributes: {
              exclude: ["UserId"]
            }
          }));

        case 3:
          checks = _context.sent;
          res.json(checks);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllChecks = getAllChecks;

var createCheck = function createCheck(req, res) {
  var user, _req$body, name, url, protocol, ignoreSSL, httpHeaders, tages, check, result, _name;

  return regeneratorRuntime.async(function createCheck$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = req.user;
          _req$body = req.body, name = _req$body.name, url = _req$body.url, protocol = _req$body.protocol, ignoreSSL = _req$body.ignoreSSL, httpHeaders = _req$body.httpHeaders, tages = _req$body.tages;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.createCheck({
            name: name,
            url: url,
            protocol: protocol,
            ignoreSSL: ignoreSSL,
            tages: tages,
            httpHeaders: JSON.stringify(httpHeaders)
          }));

        case 5:
          check = _context2.sent;

          if (!req.authentication) {
            _context2.next = 10;
            break;
          }

          console.log(req.authentication);
          _context2.next = 10;
          return regeneratorRuntime.awrap(check.createAuthentication(req.authentication));

        case 10:
          if (!req.assertion) {
            _context2.next = 14;
            break;
          }

          console.log(req.assertion);
          _context2.next = 14;
          return regeneratorRuntime.awrap(check.createAssertion(req.assertion));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(_checkModel.Check.findByPk(check.id, {
            include: [{
              model: _AssertionModel.CheckAssertion,
              attributes: {
                exclude: ["id", "CheckId"]
              }
            }, {
              model: _authenticationModel.CheckAuthentication,
              attributes: {
                exclude: ["id", "CheckId"]
              }
            }],
            attributes: {
              exclude: ["UserId"]
            }
          }));

        case 16:
          result = _context2.sent;
          return _context2.abrupt("return", res.json(result));

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);
          _name = _context2.t0.name;

          if (!_name) {
            _context2.next = 26;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "you have such service before"
          }));

        case 26:
          return _context2.abrupt("return", res.status(500).json(_context2.t0));

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 20]]);
};

exports.createCheck = createCheck;