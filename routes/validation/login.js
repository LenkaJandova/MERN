const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  let hasError = false;

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
    hasError = true;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
    hasError = true;
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
    hasError = true;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
    hasError = true;
  }

  console.log('errors: ' + errors);
  console.log('hasError : ' + hasError);
  console.log('isValid : ' + isEmpty(errors));

  return {
    errors,
    hasError,
  };
};
