"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.report = void 0;

var _sequelize = require("sequelize");

var _db = require("../../utils/db.js");

var report = _db.sequelize.define('reports', {
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  startTime: {
    type: _sequelize.DataTypes.BIGINT,
    allowNull: false
  },
  finishTime: {
    type: _sequelize.DataTypes.BIGINT,
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false
  }
});

exports.report = report;