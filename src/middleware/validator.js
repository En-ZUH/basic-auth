'use strict';
module.exports = (request, response, next) => {
    if (request.body)
        next();
    else
        next('invalid data');
}
