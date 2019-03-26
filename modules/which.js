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

module.exports = async (config, program) => {
  header('Which');
  info('Checking if which is installed on your system ...');
  return new Promise((resolve, reject) => {
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
