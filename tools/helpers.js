const io = require('./io');

module.exports.ip = async () => {
  const data = io.spawn('hostname', ['-I']);
  return data.toString().split(' ')[0].trim();
};
