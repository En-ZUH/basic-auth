'use strict';
module.exports = (err, req, res, next) => {
    const error1 = err.message ? err.message : err;
    res.status(500).json({ error1 });
}