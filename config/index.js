var env = process.env.NODE_ENV || 'development';
var config = require(`./${env}`);

module.exports = config; 

//TODO: add config in the app.js