const {spawn} = require('child_process');
const _ = require('lodash');

const {
  debug,
  error,
  success,
  warning,
  info,
  header
} = require('../tools');

module.exports = (config, program) => {
  header('Checking if which is installed ...');

  return new Promise(async (resolve, reject) => {
    const child = spawn('which', ['which']);

    child.on('error', err => {
      return reject(err);
    });

    child.stderr.on('data', data => {
      return reject(data.toString());
    });

    child.stdout.on('data', data => {
      data = data.toString();

      if (program.debug) {
        debug(`[DEBUG] data: ${data}`);
      }

      if (data === '') {
        return reject('The program "which" is not installed on this system. Please install and try again.');
      }
    });

    return resolve('Completed');
  });
};
