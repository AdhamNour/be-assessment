"use strict";

var _express = _interopRequireDefault(require("express"));

var _db = require("./utils/db.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userRoute = require("./user/routes/user.route.js");

var _relationshipManagement = require("./utils/relationshipManagement.js");

var _checksRoutes = require("./checks/routes/checks.routes.js");

var _Authrize = require("./middleware/Authrize.js");

var _cron = _interopRequireDefault(require("./cron.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use("/users", _userRoute.UserRouter);
app.use("/checks", _Authrize.authorize, _checksRoutes.checksRouter);

_db.sequelize.authenticate().then(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _relationshipManagement.manageRelationship)();
          _context.next = 3;
          return regeneratorRuntime.awrap(_db.sequelize.sync());

        case 3:
          app.listen(3000, function () {
            console.log("App is Running");
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});