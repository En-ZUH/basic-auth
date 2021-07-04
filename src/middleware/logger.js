'use strict';
module.exports = (request, response, next) => {
    console.log('Request', request.method, request.path);
    next();
}