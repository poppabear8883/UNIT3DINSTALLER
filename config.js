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

  'packages': [
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

  /* Note: prepend with -g for a globally installed package */
  'npm_packages': [
    '-g laravel-echo-server',
  ],

  /*
  | !STOP!
  |
  | The below items are used during the install,
  | like default values and dynamically set values.
  |
  | If you are unsure what you should do below, just leave it alone !!
  */

  /* Server */
  'server_name': '',
  'ip': '',
  'hostname': '',
  'ssl': true,
  'owner': '',
  'owner_email': '',
  'password': '',

  /* Database */
  'db': '',
  'dbuser': '',
  'dbpass': '',
  'dbrootpass': '',

  /* Mail */
  'mail_driver': 'smtp',
  'mail_host': '',
  'mail_port': '',
  'mail_username': '',
  'mail_password': '',
  'mail_from_name': '',

  /* Chat */
  'echo-port': '',

  /* API Keys */
  'tmdb-key': '',
  'omdb-key': '',
  'fanart-key': '',
  'tvdb-key': '',
};
