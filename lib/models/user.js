"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Id",
    },
    userName: Sequelize.STRING,
  },{timestamps:false}
);
