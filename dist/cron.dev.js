"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _axios = _interopRequireDefault(require("axios"));

var _checkModel = require("./checks/model/check.model.js");

var _sendEmail = require("./utils/sendEmail.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = _nodeCron["default"].schedule('* * * * * *', function _callee4() {
  var checks;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_checkModel.Check.findAll());

        case 2:
          checks = _context4.sent;
          checks.forEach(function _callee3(check) {
            var start, _ref, _ref2, lastReport;

            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    start = Date.now();
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(check.getReports({
                      order: [['createdAt', 'DESC']],
                      limit: 1
                    }));

                  case 3:
                    _ref = _context3.sent;
                    _ref2 = _slicedToArray(_ref, 1);
                    lastReport = _ref2[0];

                    _axios["default"].get("".concat(check.protocol, "://").concat(check.url, ":").concat(check.port || ""), {
                      timeout: 500
                    }).then(function _callee() {
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _context.next = 3;
                              return regeneratorRuntime.awrap(check.createReport({
                                startTime: start,
                                finishTime: Date.now(),
                                status: true
                              }));

                            case 3:
                              if (lastReport.status == false) {
                                (0, _sendEmail.sendNotificationEmail)(check);
                              }

                              _context.next = 9;
                              break;

                            case 6:
                              _context.prev = 6;
                              _context.t0 = _context["catch"](0);
                              console.log(_context.t0);

                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, null, null, [[0, 6]]);
                    })["catch"](function _callee2() {
                      return regeneratorRuntime.async(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.prev = 0;
                              _context2.next = 3;
                              return regeneratorRuntime.awrap(check.createReport({
                                startTime: start,
                                finishTime: Date.now(),
                                status: false
                              }));

                            case 3:
                              if (lastReport.status == true) {
                                (0, _sendEmail.sendNotificationEmail)(check);
                              }

                              _context2.next = 9;
                              break;

                            case 6:
                              _context2.prev = 6;
                              _context2.t0 = _context2["catch"](0);
                              console.log(_context2.t0);

                            case 9:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, null, null, [[0, 6]]);
                    });

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});

exports["default"] = _default;