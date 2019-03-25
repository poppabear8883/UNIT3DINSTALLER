const {spawn} = require('child_process');

module.exports = (config, program) => {
  return new Promise((resolve, reject) => {
    /* repository */
    if (!config.repository) {
      return reject('"repository" property missing from config.js');
    } else if (config.repository === '') {
      return reject('"repository" property missing value. Value must be set');
    }

    /* min_php_version */
    if (!config.min_php_version) {
      return reject('"min_php_version" property missing from config.js');
    } else if (config.repository === '') {
      return reject('"min_php_version" property missing value. Value must be set');
    } else {
      const child = spawn('php', ['-v']);
      child.on('data', data => {
        data = data.toString();
        const min = config.min_php_version.split('.');
        const ver = data.substr(3, 9).split('.');

        if (program.debug) {
          console.log(`[DEBUG][DATA] ${data}`);
          console.log(`[DEBUG][MIN_PHP_VERSION] ${config.min_php_version}`);
          console.log(`[DEBUG][VERSION] ${data.substr(3, 9)}`)
        }

        if (
          ver[0] < min[0] ||
          ver[1] < min[1] ||
          ver[2] < min[2]
        ) return reject(`The PHP versions on your system is not compatible. Min PHP Version ${config.min_php_version}`);
      });
    }

    return resolve('All policies have been checked without errors!');
  });
};
