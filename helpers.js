const io = require('./io');

module.exports.ip = async () => {
  const data = io.spawn('hostname', ['-I']);
  return data.toString().split(' ')[0].trim();
};

module.exports.validatePassword = (input) => {
  const lcCheck = new RegExp('(?=.*[a-z])');
  const ucCheck = new RegExp('(?=.*[A-Z])');
  const numCheck = new RegExp('(?=.*[0-9])');

  if (input.length < 8)
    return 'Must be eight characters or longer';

  if (!lcCheck.test(input))
    return 'Must contain at least 1 lowercase character';

  if (!ucCheck.test(input))
    return 'Must contain at least 1 uppercase alphabetical character';

  if (!numCheck.test(input))
    return 'Must contain at least 1 numeric character';

  return true;
};
