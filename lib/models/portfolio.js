"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define("portfolio",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Id",
      },
    userId:Sequelize.INTEGER,
    shareId:Sequelize.INTEGER
},{timestamps:false})
