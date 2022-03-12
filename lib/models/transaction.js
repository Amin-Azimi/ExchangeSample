"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./connection");

const Transaction = sequelize.define("transaction",{
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
    },
    price: Sequelize.DECIMAL(5,2),
    count: Sequelize.INTEGER,
    type:Sequelize.STRING(10)
},{
    timestamps:true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
}
);

module.exports = Transaction;
