const fs = require('fs');
const io = require('../tools/io');
const {totalMemory, distVersion} = require('../tools/helpers');
const stub = require('../tools/stub');

module.exports = async (config, program) => {

  io.header('MySQL Module');

  const dist = distVersion().toString();
  const mysql_root_pass = config.answers.mysql_root_pass;
  const db_name = config.answers.db_name;
  const db_user = config.answers.db_user;
  const db_pass = config.answers.db_pass;

  const mysql_dir = config.mysql_dir;

  io.info('Checking System Memory ...');
  switch (true) {
    case (totalMemory() >= 1200000 && totalMemory() < 3900000):
      io.info('Configuring MySQL for a medium sized server ...');
      fs.copyFileSync('./resources/mysql/my-medium.cnf', `${mysql_dir}/my.cnf`);
      break;
    case (totalMemory() >= 3900000):
      io.info('Configuring MySQL for a large sized server ...');
      fs.copyFileSync('./resources/mysql/my-large.cnf', `${mysql_dir}/my.cnf`);
      break;
    default:
      io.warning('Configuring MySQL for a small sized server ...');
      fs.copyFileSync('./resources/mysql/my-small.cnf', `${mysql_dir}/my.cnf`);
  }

  io.info('Setting up MySQL ...');
  if (!dist.includes('16.04') && !dist.includes('18.04')) {
    io.warning(`Your OS version (${dist}) is old. Running mysql_install_db ...`);
    const data = io.spawn('mysql_install_db');
    if (program.debug) io.debug(data);
  }

  if (dist.includes('18.04') && !fs.lstatSync('/var/lib/mysql').isDirectory()) {
    // I am assuming that the fs library will be faster and more reliable then spawning a child process.
    // So, I would love to use it where I can.
    fs.mkdirSync('/var/lib/mysql');
    // fs.chownSync(path, uid, gid) todo: how to effectively get the integer value of the mysql:mysql uid:gid ??
    io.spawn('chown', ['mysql:mysql', '/var/lib/mysql']); // todo: Remove IF we resolve the above line!

    io.info('Securing MySQL ...');
    const data = io.spawn('mysqld', [' --initialize-insecure']);
    if (program.debug) io.debug(data);
  }

  io.info('Reading "mysql/.my.cnf" stub file ...');
  const myStub = stub.ReadFile('mysql/.my.cnf');

  io.info('Preparing stub file with user specified values ...');
  const mycnf = stub.Replace({
    'mysql_root_pass': mysql_root_pass
  }, myStub);

  io.info('Writing to "/root/.my.cnf" ...');
  if (!stub.WriteFile('/root/.my.cnf', mycnf)) {
    io.error('Writing /root/.my.cnf FAILED. Please report this bug!');
    io.error('You will likely need to reinstall your OS and try again after receiving support!');
    process.exit(1);
  }

  io.info('Running "update-rc.d" ...');
  program.debug ?
    io.debug(io.spawn('update-rc.d', ['mysql', 'defaults'])) :
    io.spawn('update-rc.d', ['mysql', 'defaults']);

  io.info('Starting mysql service ...');
  program.debug ?
    io.debug(io.spawn('service', ['mysql', 'start'])) :
    io.spawn('service', ['mysql', 'start']);

  io.info('Running "mysqladmin" ...');
  program.debug ?
    io.debug(io.spawn('mysqladmin', ['-u', 'root', 'password', mysql_root_pass])) :
    io.spawn('mysqladmin', ['-u', 'root', 'password', mysql_root_pass]);

  fs.chmod('/root/.my.cnf', 600);

  const mysqlCmds = [
    `"DROP USER IF EXISTS ${db_user}"`,
    `"DROP DATABASE IF EXISTS ${db_name}"`,
    `"CREATE DATABASE ${db_name}"`,
    `"CREATE USER '${db_user}'@'localhost' IDENTIFIED BY '${db_pass}';"`,
    `"GRANT ALL PRIVILEGES ON ${db_name} . * TO '${db_user}'@'localhost'"`,
    `"UPDATE mysql.user SET authentication_string=PASSWORD('${mysql_root_pass}') WHERE User='root'"`,
    `"DELETE FROM mysql.user WHERE User=''"`,
    `"DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1')"`,
    `"DROP DATABASE test"`,
    `"DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%'"`,
    `"FLUSH PRIVILEGES"`,
  ];

  for (const cmd of mysqlCmds) {
    const data = io.spawn('mysql', ['-e', cmd]);
    if (program.debug) io.debug(data);
  }

  return io.success('MySQL Module Completed Successfully');
};
