'use strict';
const JoiRouter = require("koa-joi-router");


const router = new JoiRouter();


router.get('/health',require('./api/health'));
router.get('/users',require('./api/trades').getAllUsers);
router.post('/buy',require('./api/trades').buy);

module.exports = router;