const spawn = require('child_process');
const {
  debug,
  error,
  success,
  warning
} = require('../tools');

module.exports = async (config, program) => {
  return Promise.resolve('Server Settings have been stored!');
};
