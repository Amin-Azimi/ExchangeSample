"use strict";
const User = require("../models/user");
const Share = require("../models/share");
const Portfolio = require("../models/portfolio");
const Price = require("../models/price");
const Transaction = require("../models/transaction");
const respond = require("./responses");
const { Op } = require("sequelize");

const Trades = {};

Trades.getAllUsers = async (context) => {
  const users = await User.findAll();
  if (!users) respond.notFound(context);
  respond.success(context, users);
};

//Buying method
Trades.buy = async (context) => {
  let transaction = {};
  const { userName, symbol, count } = context.request.body;
  console.log(userName, symbol, count);
  const share = await Share.findOne({
    where: {
      symbol: symbol,
    },
  });

  //The share specified should be a registered one otherwise it should be considered a bad request
  if (!share) {
    respond.notFound(context, `Symbol ${symbol} was not found`);
    return;
  }
  const portfolio = await getPortfolioByUserName(userName);
  //The Portfolio of the user should also be registered otherwise it should be considered a bad request
  if (!portfolio) {
    respond.badRequest(
      context,
      new Error(`User ${userName} doesn't have any portfolio`)
    );
    return;
  }
  const latestPrice = await getLatestPriceOfShare(share.id);
  transaction = {
    shareId: share.id,
    userId: portfolio.userId,
    price: latestPrice,
    count,
    type: "buy",
  };
  const created = await Transaction.create(transaction);
  respond.success(context, created);
};

//Sell method
Trades.sell = async (context) => {
  const { userName, symbol, count } = context.request.body;
  const portfolioOfShare = await getPortfolioByShare(userName, symbol);
  //The share should be there in the portfolio of the customer
  if (!portfolioOfShare) {
    respond.badRequest(
      context,
      new Error(
        `Share ${symbol} doesn't exist in the portfolio of user: ${userName}`
      )
    );
    return;
  }
  //The Portfolio of the user should be registered otherwise it should be considered a bad request
  const portfolio = await getPortfolioByUserName(userName);
  if (!portfolio) {
    respond.badRequest(
      context,
      new Error(`User ${userName} doesn't have any portfolio`)
    );
    return;
  }

  const share = await Share.findOne({
    where: {
      symbol: symbol,
    },
  });
  const latestPrice = await getLatestPriceOfShare(share.id);
  const transaction = {
    shareId: share.id,
    userId: portfolio.userId,
    price: latestPrice,
    count,
    type: "sell",
  };
  const created = await Transaction.create(transaction);
  respond.success(context, created);
};

const getPortfolioByUserName = async (userName) =>
  await Portfolio.findOne({
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

const getPortfolioByShare = async (userName, symbol) =>
  await Portfolio.findOne({
    where: {
      [Op.and]: [{ "$user.userName$": userName }, { "$share.symbol$": symbol }],
    },
    include: [
      {
        attributes: ["id", "userName"],
        model: User,
        as: "user",
      },
      {
        attributes: ["id", "symbol"],
        model: Share,
        as: "share",
      },
    ],
  });

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
