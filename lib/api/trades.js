"use strict";
const User = require("../models/user");
const Share = require("../models/share");
const Portfolio = require("../models/portfolio");
const Price = require("../models/price");
const Transaction = require("../models/transaction");
const respond = require("./responses");

const Trades = {};

Trades.getAllUsers = async (context) => {
  const users = await User.findAll();
  if (!users) respond.notFound(context);
  respond.success(context, users);
};

Trades.buy = async (context) => {
    let transaction ={};
    try {
    const { userName, symbol, count } = context.request.body;
    console.log(userName, symbol, count);
    const share = await Share.findOne({
      where: {
        symbol: symbol,
      },
    });
    if (!share) {
      respond.notFound(context, new Error(`Symbol ${share} was not found`));
    }
    const portfolio = await Portfolio.findOne({
      where: {
        "$user.userName$": userName,
      },
      include: [
        {
          attributes: ["id", "userName"],
          model: User,
          as: "user",
        },
      ],
    });
    if (!portfolio) {
      respond.badRequest(
        context,
        new Error(`User ${userName} doesn't have any portfolio`)
      );
    }
    const latestPrice = await getLatestPriceOfShare(share.id);
    transaction = {
      shareId: share.id,
      userId: portfolio.userId,
      price: latestPrice,
      count,
      type: "buy",
    };
    await Transaction.create(transaction);
  } catch (err) {
    console.log("errorrrrrr:", err);
    respond.badRequest(context,new Error('There is an error'),500);
    return;
}
  respond.success(context, transaction);
};

const getLatestPriceOfShare = async (shareId) =>
  (
    await Price.findOne({
      where: {
        shareId,
      },
      order: [["created_at", "DESC"]],
    })
  ).price;

module.exports = Trades;
