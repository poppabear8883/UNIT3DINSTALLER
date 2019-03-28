const io = require('../io');

module.exports = async (config, program) => {

  io.header('Questions Module');

  io.info('\n=== Server Questions ===');
  await io.ask(config.questions.server).then(answers => {
    /* Merge these answers into the configuration answers object */
    Object.assign(config.answers, answers);
  }).catch(err => {
    io.error(err);
    process.exit(1);
  });

  io.info('\n=== Database Questions ===');
  await io.ask(config.questions.database).then(answers => {
    Object.assign(config.answers, answers);
  }).catch(err => {
    io.error(err);
    process.exit(1);
  });

  io.info('\n=== Mail Questions ===');
  await io.ask(config.questions.mail).then(answers => {
    Object.assign(config.answers, answers);
  }).catch(err => {
    io.error(err);
    process.exit(1);
  });

  io.info('\n=== Api Questions ===');
  await io.ask(config.questions.keys).then(answers => {
    Object.assign(config.answers, answers);
  }).catch(err => {
    io.error(err);
    process.exit(1);
  });

  io.info('\n=== Confirm ===');
  await io.ask([
    {
      type: 'confirm',
      name: 'install',
      message: 'About to install software on your system. Continue ?',
      default: false,
    },
  ]).then(answers => {
    if (!answers.install) {
      io.error('Aborted ...');
      process.exit(1);
    }
  }).catch(err => {
    io.error(err);
    process.exit(1);
  });

  return io.success('Questions Module Completed Successfully');

};
