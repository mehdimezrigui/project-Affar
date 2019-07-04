const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';


  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is required';
  }

  if (Validator.isEmpty(data.adress)) {
    errors.adress = 'Adress field is required';
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }
  if (Validator.isEmpty(data.region)) {
    errors.region = 'Region field is required';
  }
  if (Validator.isEmpty(data.cp)) {
    errors.cp = 'Postal code field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
