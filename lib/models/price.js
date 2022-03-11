"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define(
  "price",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Id",
    },
    shareId: Sequelize.INTEGER,
    price: Sequelize.DECIMAL(5, 2),
  },
  {
    timestamps:true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
}
);
