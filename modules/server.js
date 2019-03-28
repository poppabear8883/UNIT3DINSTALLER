const io = require('../io');
const {ip} = require('../helpers');

module.exports = async (config, program) => {

  io.header('Server Module');

  io.info('Getting directory contents ...');
  const data = io.spawn('ls', ['-la']);
  if (program.debug) io.debug(data);

  return io.success('Server Module Completed Successfully');
};

const questions = [
  {
    type: 'input',
    name: 'server_name',
    message: 'Server Name ?',
    default: function () {
      return 'UNIT3D SERVER';
    }
  },
  {
    type: 'input',
    name: 'fqdn',
    message: 'The FQDN for this server ?',
    default: function (answers) {
      return answers.server_name.replace(' ', '-').toLowerCase() + '.com';
    }
  },
  {
    type: 'input',
    name: 'ip',
    message: 'Primary IP Address ?',
    default: function () {
      return ip();
    }
  },
  {
    type: 'confirm',
    name: 'ssl',
    message: 'Use SSL (https) ?',
    default: true
  },
  {
    type: 'input',
    name: 'owner_username',
    message: 'Owner Username ?',
    default: function () {
      return 'UNIT3D';
    }
  },
  {
    type: 'input',
    name: 'owner_email',
    message: 'Owners Email ?',
    default: function (answers) {
      return `${answers.owner_username}@${answers.fqdn}`;
    }
  },
  {
    type: 'password',
    name: 'owner_password',
    message: 'Owner Password ?',
    mask: '*',
    validate: (input) => {
      if (input.length < 8)
        return 'Must be eight characters or longer';

      const strongPassword = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'
      );

      /* todo: Break this down into separate segments */
      if (!strongPassword.test(input))
        return '\n- Must contain at least 1 lowercase character\n' +
          '- Must contain at least 1 uppercase alphabetical character\n' +
          '- Must contain at least 1 numeric character\n' +
          '- Must contain at least one special character';

      return true;
    }
  },
  {
    type: 'password',
    name: 'owner_password_confirm',
    message: 'Owner Password ?',
    mask: '*',
    validate: (input, answers) => {
      if (input !== answers.owner_password)
        return 'Passwords do not match. Try again!';

      return true;
    }
  }
];
