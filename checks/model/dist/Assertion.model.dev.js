"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckAssertion = void 0;

var _sequelize = require("sequelize");

var _db = require("../../utils/db.js");

var CheckAssertion = _db.sequelize.define('assertion', {
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  statusCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false
});

exports.CheckAssertion = CheckAssertion;