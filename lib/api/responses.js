'use strict';

module.exports = {
    success: (context, data) => {
        context.body = data;
        context.status = data ? 200 : 204;
    },
    badRequest: (context, message,status=400) => {
        console.log('errr', message);
        context.body = {
            message: message
        };
        context.status = status;
    },
    notFound: (context,messsage='Resource was not found') => {
        context.body = { messsage };
        context.status = 404;
    }
};
