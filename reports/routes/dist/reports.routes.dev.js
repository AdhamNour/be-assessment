"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportRouter = void 0;

var _express = require("express");

var _db = require("../../utils/db.js");

var _reportModel = require("../model/report.model.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reportRouter = (0, _express.Router)();
exports.reportRouter = reportRouter;
reportRouter.get('/', function _callee(req, res) {
  var user, checks, resultArray, index, check, result, _result, sumOfStatus, countOfStatus, finalResult, _result2, countOfFailure, _result3, downtime, _result4, uptime, _result5, avrg_response;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.user;
          _context.next = 3;
          return regeneratorRuntime.awrap(user.getChecks({
            raw: true,
            attributes: ['url', 'port', 'name', 'protocol', 'id']
          }));

        case 3:
          checks = _context.sent;
          resultArray = [];
          index = 0;

        case 6:
          if (!(index < checks.length)) {
            _context.next = 41;
            break;
          }

          check = checks[index];
          _context.next = 10;
          return regeneratorRuntime.awrap(_reportModel.report.findOne({
            attributes: [[_db.sequelize.fn("SUM", _db.sequelize.col("Status")), 'sumOfStatus'], [_db.sequelize.fn("COUNT", _db.sequelize.col("Status")), 'countOfStatus']],
            where: {
              CheckId: check.id
            },
            raw: true
          }));

        case 10:
          result = _context.sent;
          _result = result, sumOfStatus = _result.sumOfStatus, countOfStatus = _result.countOfStatus;
          finalResult = _objectSpread({}, check, {
            availability: sumOfStatus / countOfStatus
          });
          _context.next = 15;
          return regeneratorRuntime.awrap(_reportModel.report.findOne({
            attributes: [[_db.sequelize.fn("COUNT", _db.sequelize.col("Status")), 'countOfFailure']],
            where: {
              CheckId: check.id,
              status: 0
            },
            raw: true
          }));

        case 15:
          result = _context.sent;
          _result2 = result, countOfFailure = _result2.countOfFailure;
          finalResult = _objectSpread({}, finalResult, {
            outage: countOfFailure
          });
          _context.next = 20;
          return regeneratorRuntime.awrap(_reportModel.report.findOne({
            attributes: [[_db.sequelize.literal('Sum(finishTime-startTime)'), 'downtime']],
            where: {
              CheckId: check.id,
              status: 0
            },
            raw: true
          }));

        case 20:
          result = _context.sent;
          //console.log(result);
          _result3 = result, downtime = _result3.downtime;
          finalResult = _objectSpread({}, finalResult, {
            downtime: downtime || 0
          });
          _context.next = 25;
          return regeneratorRuntime.awrap(_reportModel.report.findOne({
            attributes: [[_db.sequelize.literal('Sum(finishTime-startTime)'), 'uptime']],
            where: {
              CheckId: check.id,
              status: 1
            },
            raw: true
          }));

        case 25:
          result = _context.sent;
          //console.log(result);
          _result4 = result, uptime = _result4.uptime;
          finalResult = _objectSpread({}, finalResult, {
            uptime: uptime || 0
          });
          _context.next = 30;
          return regeneratorRuntime.awrap(_reportModel.report.findOne({
            attributes: [[_db.sequelize.literal('avg(finishTime-startTime)'), 'avrg_response']],
            where: {
              CheckId: check.id,
              status: 1
            },
            raw: true
          }));

        case 30:
          result = _context.sent;
          //console.log(result);
          _result5 = result, avrg_response = _result5.avrg_response;
          finalResult = _objectSpread({}, finalResult, {
            avrg_response: avrg_response || 0
          });
          _context.next = 35;
          return regeneratorRuntime.awrap(_reportModel.report.findAll({
            where: {
              CheckId: check.id
            },
            attributes: ['startTime', 'finishTime', 'status'],
            raw: true
          }));

        case 35:
          result = _context.sent;
          finalResult = _objectSpread({}, finalResult, {
            history: result
          });
          resultArray = [].concat(_toConsumableArray(resultArray), [finalResult]);

        case 38:
          index++;
          _context.next = 6;
          break;

        case 41:
          res.json(resultArray);

        case 42:
        case "end":
          return _context.stop();
      }
    }
  });
});