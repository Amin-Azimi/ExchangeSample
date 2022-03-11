"use strict";
const User = require("../models/user");
const respond = require("./responses");

const Trades = {};

Trades.getAllUsers = async (context) => {
  const users = await User.findAll();
  if (!users) respond.notFound(context);
  respond.success(context, users);
};

Trades.buy = async (context)=>{
    const {user,share,number} = context.request.body;
    console.log(user,share,number);
}

module.exports = Trades;
