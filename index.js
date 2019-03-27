'use strict';
const fs = require('fs');
const program = require('commander');
const config = require('./config');

const io = require('./tools');

const steps = [
  'properties',
  'repositories',
  'php',
  'server'
];

program
  .version('1.0.0', '-v, --version')
  .option('--debug', 'Run installer in debug mode to show additional output', null, false)
  .option('--disable-ssl', 'Disable SSL', null, false)
  .parse(process.argv);

steps.forEach(file => {
  fs.lstat(`./modules/${file}.js`, (err, stats) => {
    if (err)
      return io.error(err);

    if (stats.isFile()) {
      const mod = require(`./modules/${file}`);
      mod(config, program);
    } else {
      io.error(`./modules/${file}.js is not a known file!`);
      process.exit(1);
    }
  });
});

