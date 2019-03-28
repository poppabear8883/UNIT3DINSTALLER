/* todo: make sure every property in this file is validated through the properties module */

const {ip, validatePassword} = require('./helpers');

module.exports = {
  /* Main */
  'github': 'https://github.com/HDInnovations/UNIT3D.git',
  'web-user': 'www-data',
  'install_dir': '/var/www/html',

  'repositories': [
    'ppa:nginx/development',
    'ppa:ondrej/php',
    'ppa:certbot/certbot',
  ],

  /* These packages are installed GLOBALLY. */
  'npm_packages': [
    'laravel-echo-server',
  ],

  'packages': [
    'ufw',
    'debconf-utils',
    'python-certbot-nginx',
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
    'nginx',
    'mysql-server',
    'supervisor',
    'redis-server',
    'nodejs',
    'build-essential',
    'git',
    'tmux',
    'vim',
    'wget',
    'zip',
    'unzip',
    'htop',
  ],

  'questions': {
    /* NOTE: The `name` properties of these objects MUST match the value in the stubs */

    /* Server Questions */
    'server': [
      {
        type: 'input',
        name: 'server_name',
        message: 'Server Name ?',
        default () {
          return 'UNIT3D SERVER';
        },
      },
      {
        type: 'input',
        name: 'fqdn',
        message: 'The FQDN for this server ?',
        default (answers) {
          return answers.server_name.replace(' ', '-').toLowerCase() + '.com';
        },
      },
      {
        type: 'input',
        name: 'ip',
        message: 'Primary IP Address ?',
        default () {
          return ip();
        },
      },
      {
        type: 'confirm',
        name: 'ssl',
        message: 'Use SSL (https) ?',
        default: true,
      },
      {
        type: 'input',
        name: 'owner_username',
        message: 'Owner Username ?',
        default () {
          return 'UNIT3D';
        },
      },
      {
        type: 'input',
        name: 'owner_email',
        message: 'Owners Email ?',
        default (answers) {
          return `${answers.owner_username}@${answers.fqdn}`;
        },
      },
      {
        type: 'password',
        name: 'owner_password',
        message: 'Owner Password ?',
        mask: '*',
        validate (input) {
          return validatePassword(input);
        },
      },
      {
        type: 'password',
        name: 'owner_password_confirm',
        message: 'Confirm Owner Password ?',
        mask: '*',
        validate (input, answers) {
          if (input !== answers.owner_password)
            return 'Passwords do not match. Try again!';

          return true;
        },
      },
    ],

    /* Database Questions */
    'database': [
      {
        type: 'input',
        name: 'db_name',
        message: 'Database Name ?',
        default () {
          return 'unit3d';
        },
      },
      {
        type: 'input',
        name: 'db_user',
        message: 'Database User ?',
        default () {
          return 'unit3d';
        },
      },
      {
        type: 'password',
        name: 'db_pass',
        message: 'Database Password ?',
        mask: '*',
        validate (input) {
          return validatePassword(input);
        },
      },
      {
        type: 'password',
        name: 'db_pass_confirm',
        message: 'Confirm Database Password ?',
        mask: '*',
        validate (input, answers) {
          if (input !== answers.db_pass)
            return 'Passwords do not match. Try again!';

          return true;
        },
      },
      {
        type: 'password',
        name: 'mysql_root_pass',
        message: 'MySQL Root Password ?',
        mask: '*',
        validate (input) {
          return validatePassword(input);
        },
      },
      {
        type: 'password',
        name: 'mysql_root_pass_confirm',
        message: 'Confirm MySQL Root Password ?',
        mask: '*',
        validate (input, answers) {
          if (input !== answers.mysql_root_pass)
            return 'Passwords do not match. Try again!';

          return true;
        },
      },
    ],

    /* Mail Questions */
    'mail': [
      {
        type: 'list',
        message: 'Select Mail Driver',
        name: 'mail_driver',
        choices: [
          'smtp',
          'sendmail',
          'mailgun',
          'mandrill',
          'ses',
          'sparkpost',
          'log',
          'array',
        ],
      },
      {
        type: 'input',
        name: 'mail_host',
        message: 'Mail Host ?',
        validate (input) {
          if (input === '')
            return 'Mail Host is required';

          return true;
        },
      },
      {
        type: 'input',
        name: 'mail_username',
        message: 'Mail Username ?',
        validate (input) {
          if (input === '')
            return 'Mail Username is required';

          return true;
        },
      },
      {
        type: 'password',
        name: 'mail_password',
        message: 'Mail Password ?',
        mask: '*',
        validate (input) {
          return validatePassword(input);
        },
      },
      {
        type: 'password',
        name: 'mail_password_confirm',
        message: 'Confirm Mail Password ?',
        mask: '*',
        validate (input, answers) {
          if (input !== answers.mail_password)
            return 'Passwords do not match. Try again!';

          return true;
        },
      },
      {
        type: 'input',
        name: 'mail_from',
        message: 'Mail From ?',
        validate (input) {
          if (input === '')
            return 'Mail From is required';

          return true;
        },
      },
    ],

    /* Api Keys Questions */
    'keys': [
      {
        type: 'input',
        name: 'tmdb_key',
        message: 'TMDB API Key ?',
        validate (input) {
          if (input.length !== 8)
            return 'TMDB API Key should be exactly 8 characters long';

          return true;
        },
      },
      {
        type: 'input',
        name: 'omdb_key',
        message: 'OMDB API Key ?',
        validate (input) {
          if (input.length !== 32)
            return 'OMDB API Key should be exactly 32 characters long';

          return true;
        },
      },
    ],
  },

  /* Do Not Touch This */
  'answers': {},
};
