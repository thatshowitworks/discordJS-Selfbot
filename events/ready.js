const chalk = require('chalk');
const moment = require('moment');
module.exports = client => {
   console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Client connected.`))
 };
//When client connects.
