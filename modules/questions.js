const io = require('../tools/io');

module.exports = async (config, program) => {

  io.header('Questions Module');

  const questions = {
    'Server': config.questions.server,
    'Database': config.questions.database,
    'Mail': config.questions.mail,
    'Api': config.questions.keys,
  };

  for (let item of Object.keys(questions)) {
    io.info(`\n=== ${item} Questions ===`);
    await io.ask(questions[item]).then(answers => {
      /* Merge these answers into the configuration answers object */
      Object.assign(config.answers, answers);
    }).catch(err => {
      io.error(err);
      process.exit(1);
    });
  }

  if (program.debug) io.debug(JSON.stringify(config.answers, null, '  '));

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
