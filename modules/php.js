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
  header('PHP Module');
  return new Promise(async (resolve, reject) => {
    info('Checking PHP Version ...');
    const child = spawn('php', ['-v']);

    await child.on('error', err => {
      warning('PHP was not found. Attempting to install ...');
      const php = spawn('apt-get', [
        'install',
        'debconf-utils',
        'php-pear',
        'php7.3-curl',
        'php7.3-dev',
        'php7.3-gd',
        'php7.3-mbstring',
        'php7.3-zip',
        'php7.3-mysql',
        'php7.3-xml',
        'php7.3-fpm',
        'php7.3-intl'
      ]);

      php.on('error', phperr => {
        return reject(phperr);
      });

      php.stderr.on('data', data => {
        return reject(data.toString());
      });

      php.stdout.on('data', data => {
        if (program.debug) {
          debug(data.toString());
        }
      });

      php.on('exit', () => {
        return resolve('PHP was successfully Installed');
      });
    });

    child.stderr.on('data', data => {
      return reject(data.toString());
    });

    child.stdout.on('data', data => {
      data = data.toString();
      const min = config.min_php_version.split('.');
      const ver = data.substr(3, 9).split('.');

      if (program.debug) {
        debug(`[DEBUG] data: ${data}`);
        debug(`[DEBUG] min_php_version: ${config.min_php_version}`);
        debug(`[DEBUG] Version: ${data.substr(3, 9)}`);
      }

      if (
        ver[0] < min[0] ||
        ver[1] < min[1] ||
        ver[2] < min[2]
      ) return reject(`The PHP versions on your system is not compatible. Min PHP Version ${config.min_php_version}`);
    });

    return resolve('Completed');
  });
};
