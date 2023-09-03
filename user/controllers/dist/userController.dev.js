"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.verify = exports.signup = void 0;

var _randombytes = _interopRequireDefault(require("randombytes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = require("../model/user.model.js");

var _sendEmail = require("../../utils/sendEmail.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signup = function signup(req, res) {
  var _req$body, name, email, password, user, token;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel.User.create({
            name: name,
            email: email,
            password: password
          }));

        case 4:
          user = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(user.createToken({
            token: (0, _randombytes["default"])(6).toString("hex"),
            user_id: user.id
          }));

        case 7:
          token = _context.sent;
          (0, _sendEmail.sendVerificationEmail)(user, token.token);
          res.json({
            name: user.name,
            email: user.email
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            message: "Something went wrong"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

exports.signup = signup;

var verify = function verify(req, res) {
  var _req$params, id, token, user, user_token;

  return regeneratorRuntime.async(function verify$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, token = _req$params.token;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userModel.User.findByPk(id));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(user.getToken());

        case 6:
          user_token = _context2.sent;

          if (!(user_token.token === token)) {
            _context2.next = 15;
            break;
          }

          user.isVerified = true;
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          user_token.destroy();
          res.status(200).json({
            message: "account verified successfully"
          });
          _context2.next = 16;
          break;

        case 15:
          res.status(400).json({
            message: "there something went wrong"
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.verify = verify;

var signin = function signin(req, res) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function signin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_userModel.User.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "there is no such user"
          }));

        case 6:
          if (!(user.password === password)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(200).json({
            token: _jsonwebtoken["default"].sign(user.id, "SECRET")
          }));

        case 10:
          res.status(404).json({
            message: "creditential failed"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.signin = signin;