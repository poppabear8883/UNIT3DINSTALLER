'use strict';
const fs = require('fs');
const program = require('commander');
const config = require('./config');

const {
  debug,
  error,
  success,
  warning,
} = require('./tools');

const steps = [
  //'which',
  // 'properties',
  'php',
  //'server',
];

program
  .version('1.0.0', '-v, --version')
  .option('--debug', 'Run installer in debug mode to show additional output', null, false)
  .option('--disable-ssl', 'Disable SSL', null, false)
  .parse(process.argv);

steps.forEach(file => {
  fs.lstat(`./modules/${file}.js`, async (err, stats) => {
    if (err)
      return error(err);

    if (program.debug) {
      debug(`[DEBUG] ${file}.js`);
      debug(`[DEBUG] Is file: ${stats.isFile()}`);
      debug(`[DEBUG] Is directory: ${stats.isDirectory()}`);
      debug(`[DEBUG] Is symbolic link: ${stats.isSymbolicLink()}`);
    }

    if (stats.isFile()) {
      const m = require(`./modules/${file}`);

      m(config, program)
        .then(data => {
          success(data);
        })
        .catch(err => {
          error(err);
          process.exit(1);
        });
    } else {
      error(`[ERROR] ./modules/${file}.js is not a known file!`);
      process.exit(1);
    }
  });
});

