const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let hasError = false;
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  console.log(data);
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
    hasError = true;
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
    hasError = true;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
    hasError = true;
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
    hasError = true;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
    hasError = true;
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
    hasError = true;
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
    hasError = true;
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
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
