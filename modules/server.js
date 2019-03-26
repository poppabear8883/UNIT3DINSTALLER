const { spawn } = require('child_process');
const {
  debug,
  error,
  success,
  warning
} = require('../tools');

module.exports = (config, program) => {
  return new Promise((resolve, reject) => {
    return resolve('Server Settings have been stored!');
  });
};
