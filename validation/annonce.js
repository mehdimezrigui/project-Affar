const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAnnoucementInput(data) {
  let errors = {};

  data.avatar = !isEmpty(data.avatar) ? data.avatar : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.condition = !isEmpty(data.condition) ? data.condition : '';
  data.etat = !isEmpty(data.etat) ? data.etat : '';

  if (Validator.isEmpty(data.avatar)) {
    errors.avatar = 'Avatar field is required';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required'
  }
  if (Validator.isEmpty(data.condition)) {
    errors.condition = 'Condition field is required';
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
