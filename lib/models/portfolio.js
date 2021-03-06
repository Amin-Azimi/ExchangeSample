"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");
const User = require('./user');
const Share = require('./share');

const Portfolio = sequelize.define("portfolio",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Id",
      },
    userId:{
      type: Sequelize.INTEGER,
      allowNull:false,
      refrences:{
        model:{
          tableName:'users'
        },
        key:'id'
      }
    },
    shareId:{
      type: Sequelize.INTEGER,
      allowNull:false,
      refrences:{
        model:{
          tableName:'shares'
        },
        key:'id'
      }
    }
},{timestamps:false});

Portfolio.belongsTo(User,{ as: 'user', foreignKey:'userId'});
Portfolio.belongsTo(Share,{ as: 'share', foreignKey:'shareId'});
module.exports = Portfolio;
