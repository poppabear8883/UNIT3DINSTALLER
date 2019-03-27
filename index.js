'use strict';
const fs = require('fs');
const program = require('commander');
const figlet = require('figlet');

const config = require('./config');
const io = require('./io');

const steps = [
  'properties',
  'utf8',
  'repositories',
  'packages',
  'composer',
  // 'server',
];

program
  .version('0.1.0', '-v, --version')
  .option('--debug', 'Run installer in debug mode to show additional output', null, false)
  .option('--disable-ssl', 'Disable SSL', null, false)
  .parse(process.argv);

io.info(figlet.textSync('UNIT3D', {
  font: 'Big Money-se',
  horizontalLayout: 'default',
  verticalLayout: 'default',
}));

io.info(`Installer Version: v0.1.0`);

io.ask([
  {
    type: 'confirm',
    name: 'toContinue',
    message: 'About to install software on your system, continue ?',
    default: false,
  },
]).then(answers => {
  if (answers.toContinue) {
    steps.forEach(async (file, index) => {
      if (program.debug) io.debug(`${file}.js: Index Pos: ${index}`);

      try {
        const mod = require(`./modules/${file}`);
        await mod(config, program);
      } catch (err) {
        io.error(err);
        process.exit(1);
      }

    });
  }
}).catch(err => {
  io.error(err);
  process.exit(1);
});
