const jwt = require('jsonwebtoken');
const util = require('util');

// we make these two methods from being callback based to Promise based
exports.sign = util.promisify(jwt.sign);
exports.verify = util.promisify(jwt.verify)