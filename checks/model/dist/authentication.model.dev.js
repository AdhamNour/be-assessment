"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckAuthentication = void 0;

var _sequelize = require("sequelize");

var _db = require("../../utils/db.js");

var CheckAuthentication = _db.sequelize.define('authentication', {
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  // don't forget to enable timestamps!
  timestamps: true,
  // I don't want createdAt
  createdAt: false,
  updatedAt: false
});

exports.CheckAuthentication = CheckAuthentication;