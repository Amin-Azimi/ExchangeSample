"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define(
  "share",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Id",
    },
    symbol: Sequelize.STRING,
  }
  ,{timestamps:false});
