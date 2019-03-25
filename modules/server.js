const { spawn } = require('child_process');

module.exports = (config, program) => {
  return new Promise((resolve, reject) => {
    return resolve('Server Settings have been stored!');
  });
};
