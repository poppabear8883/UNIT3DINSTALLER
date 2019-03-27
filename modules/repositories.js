const io = require('../tools');

module.exports = (config, program) => {
  io.header('Repositories Module');

  const repos = [
    'ppa:nginx/development',
    'ppa:ondrej/php',
    'ppa:certbot/certbot',
  ];

  repos.forEach(value => {
    io.info(`Adding ${value} repository ...`);
    const data = io.spawn('add-apt-repository', ['-y', value]);
    if (program.debug) io.debug(data);
  });

  io.success('Repositories Module Completed Successfully');
};
