module.exports.NotEmpty = (input) => {
  if (input === '')
    return 'Required';

  return true;
};

module.exports.Email = (input) => {
  const emailCheck = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

  if (!emailCheck.test(input))
    return 'Not a valid email format (ie: email@domain.com)';

  return true;
};

module.exports.Password = (input) => {
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

module.exports.confirmPassword = (input, compareTo) => {
  if (input !== compareTo)
    return 'Passwords do not match. Try again!';

  return true;
};
