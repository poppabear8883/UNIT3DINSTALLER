const io = require('../io');

module.exports = async (config, program) => {

  io.header('NPM Packages Module');

  config.npm_packages.forEach(value => {
    let values = value;
    let data;

    if (value.startsWith('-g'))
      values = value.split(' ');

    if (Array.isArray(values)) {
      io.info(`Globally Installing ${values[1]} ...`);
      data = io.spawn('npm', ['install', values[0], values[1]]);
    } else {
      io.info(`Installing ${values} ...`);
      data = io.spawn('npm', ['install', values, '--save']);
    }

    if (program.debug) io.debug(data);
  });

  return io.success('NPM Packages Module Completed Successfully');
};
