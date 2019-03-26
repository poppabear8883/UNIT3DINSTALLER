const chalk = require('chalk');
const inquirer = require('inquirer');

const debug = (message) => console.log(chalk.blue(message));
const warning = (message) => console.log(chalk.yellow(message));
const success = (message) => console.log(chalk.green(message));
const error = (message) => console.log(chalk.red(message));
const info = (message) => console.log(chalk.cyan(message));
const header = (message) => console.log(chalk.magenta(`======== ${message} ========`));

module.exports = {
  debug,
  warning,
  success,
  error,
  info,
  header,
};
