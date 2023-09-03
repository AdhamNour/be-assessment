"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Check = void 0;

var _sequelize = require("sequelize");

var _db = require("../../utils/db.js");

var Check = _db.sequelize.define('Check', {
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  protocol: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  port: {
    type: _sequelize.DataTypes.INTEGER
  },
  webhook: {
    type: _sequelize.DataTypes.STRING
  },
  path: {
    type: _sequelize.DataTypes.STRING
  },
  timeout: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 5
  },
  interval: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 10
  },
  threshold: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 1
  },
  tages: {
    type: _sequelize.DataTypes.STRING
  },
  ignoreSSL: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false
  },
  httpHeaders: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  // don't forget to enable timestamps!
  timestamps: true,
  // I don't want createdAt
  createdAt: false,
  updatedAt: false,
  indexes: [{
    unique: true,
    fields: ['url', 'UserId', 'port']
  }]
});

exports.Check = Check;