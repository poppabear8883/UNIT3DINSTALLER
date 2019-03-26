const {
  debug,
  error,
  success,
  warning,
  info,
  header
} = require('../tools');

module.exports = async (config, program) => {
  return new Promise((resolve, reject) => {
    header('Config Properties');

    /* repository */
    info('Checking repository property exists in config ...');
    if (!config.repository) {
      return reject('"repository" property missing from config.js');
    }

    info('Checking repository property has value ...');
    if (config.repository === '') {
      return reject('"repository" property missing value. Value must be set');
    }

    /* php_min_version */
    info('Checking min_php_version property exists in config ...');
    if (!config.min_php_version) {
      return reject('"min_php_version" property missing from config.js');
    }

    info('Checking min_php_version property has value ...');
    if (config.min_php_version === '') {
      return reject('"min_php_version" property missing value. Value must be set');
    }

    return resolve('Completed');
  });
};
