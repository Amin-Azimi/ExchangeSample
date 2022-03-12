'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./lib/routes');
const respond = require("./lib/api/responses");
const PORT = 8080;

app.use(require('koa-bodyparser')());
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
        respond.badRequest(ctx,err.message,err.statusCode || err.status || 500);
    }
  });
app.use(router.middleware());

app.listen(PORT);
console.log('Listening on http://localhost:%s/', PORT);
