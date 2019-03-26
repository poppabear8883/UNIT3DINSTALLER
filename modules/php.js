const spawn = require('await-spawn');

const {
  debug,
  error,
  success,
  warning,
  info,
  header,
} = require('../tools');

module.exports = (config, program) => {
  header('PHP Module');

  info('Checking PHP Version ...');

  return new Promise((resolve, reject) => {
    spawn('add-apt-repository', [
      '-y',
      'ppa:nginx/development',
      'ppa:ondrej/php',
      'ppa:certbot/certbot',
    ]).then(data => {
      if (program.debug) {
        debug(data);
      }

      spawn('apt-get', [
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
        'php7.3-intl',
      ]).then(data0 => {
        if (program.debug) {
          debug(data0);
        }

        spawn('php', ['-v']).then(data1 => {
          const min = config.min_php_version.split('.');
          const ver = data1.substr(3, 9).split('.');

          if (program.debug) {
            debug(`[DEBUG] data: ${data1}`);
            debug(`[DEBUG] min_php_version: ${config.min_php_version}`);
            debug(`[DEBUG] Version: ${data1.substr(3, 9)}`);
          }

          if (
            ver[0] < min[0] ||
            ver[1] < min[1] ||
            ver[2] < min[2]
          ) {
            error('4');
            return reject(`The PHP version on your system is not compatible. Min PHP Version ${config.min_php_version}`);
          }

          return resolve(data1);
        }).catch(err => {
          error('1');
          return reject(err.stderr);
        });

      }).catch(err => {
        error('2');
        return reject(err.stderr);
      });

    }).catch(err => {
      error('3');
      return reject(err);
    });
  });
};
