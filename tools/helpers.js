const os = require('os');
const io = require('./io');

module.exports.ip = async () => {
  const data = io.spawn('hostname', ['-I']);
  return data.toString().split(' ')[0].trim();
};

module.exports.distVersion = async () => {
  const data = io.spawn('sh', ['-c', 'head -n1 /etc/issue | cut -f 2 -d \' \'']);
  return data.toString();
};

module.exports.totalMemory = async () => {
  return os.totalmem();
};
