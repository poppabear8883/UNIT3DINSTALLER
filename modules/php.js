const io = require('../tools');

module.exports = (config, program) => {
  io.header('PHP Module');

  const pkgs = [
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
  ];

  pkgs.forEach(value => {
    io.info(`Installing ${value} ...`);
    const data = io.spawn('apt-get', [
      'install',
      '-y',
      value
    ]);

    if (program.debug) {
      io.debug(data);
    }
  });

  io.success('PHP Module Completed Successfully');
};
