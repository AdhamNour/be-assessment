"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCheck = exports.deleteCheck = exports.getCheckById = exports.createCheck = exports.getAllChecks = void 0;

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
  var user, _req$body, name, url, protocol, ignoreSSL, httpHeaders, tages, path, port, webhook, timeout, interval, threshold, check, result, _name;

  return regeneratorRuntime.async(function createCheck$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = req.user;
          _req$body = req.body, name = _req$body.name, url = _req$body.url, protocol = _req$body.protocol, ignoreSSL = _req$body.ignoreSSL, httpHeaders = _req$body.httpHeaders, tages = _req$body.tages, path = _req$body.path, port = _req$body.port, webhook = _req$body.webhook, timeout = _req$body.timeout, interval = _req$body.interval, threshold = _req$body.threshold;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.createCheck({
            name: name,
            url: url,
            protocol: protocol,
            ignoreSSL: ignoreSSL,
            tages: tages,
            httpHeaders: JSON.stringify(httpHeaders),
            path: path,
            port: port,
            webhook: webhook,
            timeout: timeout,
            interval: interval
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

var getCheckById = function getCheckById(req, res) {
  var id, user, result;
  return regeneratorRuntime.async(function getCheckById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context3.next = 4;
          return regeneratorRuntime.awrap(user.getChecks({
            where: {
              id: id
            },
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

        case 4:
          result = _context3.sent;
          return _context3.abrupt("return", res.json(result[0]));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCheckById = getCheckById;

var deleteCheck = function deleteCheck(req, res) {
  var id, user, result;
  return regeneratorRuntime.async(function deleteCheck$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context4.next = 4;
          return regeneratorRuntime.awrap(user.getChecks({
            where: {
              id: id
            },
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

        case 4:
          result = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(result[0].destroy());

        case 7:
          return _context4.abrupt("return", res.json({
            message: 'success'
          }));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteCheck = deleteCheck;

var updateCheck = function updateCheck(req, res) {
  var id, user, result, updateObject, toBeSet, _req$body2, authentication, assertion, username, password, nwq_authentication, statusCode, new_assertion;

  return regeneratorRuntime.async(function updateCheck$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context5.next = 4;
          return regeneratorRuntime.awrap(user.getChecks({
            where: {
              id: id
            },
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

        case 4:
          result = _context5.sent;
          updateObject = {};
          toBeSet = Object.keys(req.body).filter(function (e) {
            return !['token', 'authentication', 'assertion'].includes(e) && Object.keys(result[0].toJSON()).includes(e);
          });
          toBeSet.forEach(function (e) {
            return updateObject[e] = req.body[e].toString();
          });
          result[0].set(updateObject);
          _req$body2 = req.body, authentication = _req$body2.authentication, assertion = _req$body2.assertion;

          if (!authentication) {
            _context5.next = 19;
            break;
          }

          username = authentication.username, password = authentication.password;
          _context5.next = 14;
          return regeneratorRuntime.awrap(result[0].getAuthentication());

        case 14:
          nwq_authentication = _context5.sent;

          if (username) {
            nwq_authentication.set({
              username: username
            });
          }

          if (password) {
            nwq_authentication.set({
              password: password
            });
          }

          _context5.next = 19;
          return regeneratorRuntime.awrap(nwq_authentication.save());

        case 19:
          if (!assertion) {
            _context5.next = 28;
            break;
          }

          statusCode = assertion.statusCode;
          _context5.next = 23;
          return regeneratorRuntime.awrap(result[0].getAssertion());

        case 23:
          new_assertion = _context5.sent;

          if (!statusCode) {
            _context5.next = 28;
            break;
          }

          new_assertion.set({
            statusCode: statusCode
          });
          _context5.next = 28;
          return regeneratorRuntime.awrap(new_assertion.save());

        case 28:
          _context5.next = 30;
          return regeneratorRuntime.awrap(result[0].save());

        case 30:
          _context5.next = 32;
          return regeneratorRuntime.awrap(user.getChecks({
            where: {
              id: id
            },
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

        case 32:
          result = _context5.sent;
          return _context5.abrupt("return", res.json(result[0]));

        case 34:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updateCheck = updateCheck;