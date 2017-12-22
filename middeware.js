'use strict';

module.exports = function (req, res) {

    // Error 404 handling
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
};