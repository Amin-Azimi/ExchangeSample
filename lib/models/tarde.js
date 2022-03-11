"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define(
  "trade",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Id",
    },
    portfolioId: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);
