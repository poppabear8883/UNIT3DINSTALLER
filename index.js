'use strict';
const fs = require('fs');

const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');

const config = require('./config');

const steps = [
  'policies',
  'server',
];

program
  .version('1.0.0', '-v, --version')
  .option('--debug', 'Run installer in debug mode to show additional output', null, false)
  .option('--disable-ssl', 'Disable SSL', null, false)
  .parse(process.argv);

const debug = (message) => console.log(chalk.blue(message));
const warning = (message) => console.log(chalk.yellow(message));
const success = (message) => console.log(chalk.green(message));
const error = (message) => console.log(chalk.red(message));

steps.forEach(async file => {
  fs.lstat(`./modules/${file}.js`, (err, stats) => {
    if(err)
      return error(err);

    if (program.debug) {
      debug(`[DEBUG] ${file}.js`);
      debug(`[DEBUG] Is file: ${stats.isFile()}`);
      debug(`[DEBUG] Is directory: ${stats.isDirectory()}`);
      debug(`[DEBUG] Is symbolic link: ${stats.isSymbolicLink()}`);
    }

    if (stats.isFile()) {
      const m = require(`./modules/${file}`);

      m(config, program).then(res => {
        success(res);
      }).catch(err => {
        error(`[ERROR] ${err}`);
        process.exit(1);
      });
    } else {
      error(`[ERROR] ./modules/${file}.js is not a known file!`);
      process.exit(1);
    }
  });
});

