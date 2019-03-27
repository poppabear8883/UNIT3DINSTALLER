const io = require('../tools');

module.exports = (config, program) => {
  io.header('Properties Module');

    /* repository */
  io.info('Checking repository property exists in config ...');
    if (!config.repository) {
      io.error('"repository" property missing from config.js');
      process.exit(1);
    }

  io.info('Checking repository property has value ...');
    if (config.repository === '') {
      io.error('"repository" property missing value. Value must be set');
      process.exit(1);
    }

  io.success('Properties Module Completed Successfully');
};
