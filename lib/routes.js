'use strict';
const JoiRouter = require("koa-joi-router");
const trades = require('./api/trades');

const router = new JoiRouter();


router.get('/health',require('./api/health'));
router.get('/users',trades.getAllUsers);
router.post('/buy',trades.buy);

module.exports = router;