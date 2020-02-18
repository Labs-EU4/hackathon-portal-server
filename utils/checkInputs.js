const validator = require('validator');

const checkInput = inputValue => {
  const errors = {};
  Object.keys(inputValue).forEach(key => {
    if (
      !inputValue[key] ||
      validator.isEmpty(String(inputValue[key])) ||
      String(inputValue[key]).trim() === '' ||
      inputValue[key] === ''
    ) {
      errors[key] = `${key} field can not be blank`;
    } else {
      /*
       *input Validation
       */
      if (key === 'event_title') {
        if (!validator.isLength(inputValue[key], { min: 10 })) {
          errors[key] = `${key} must be between 10 to 50 characters`;
        }
      }
      if (key === 'event_description' || key === 'guidelines') {
        if (!validator.isLength(inputValue[key], { min: 10 })) {
          errors[key] = `${key} must be between 10 to 100 characters`;
        }
      }

      if (key === 'participation_type') {
        if (!['individual', 'team', 'both'].includes(inputValue[key])) {
          errors[
            key
          ] = `please pick between these three options for participation type ['individual','team','both']`;
        }
      }

      if (key === 'id' || key === 'category_id' || key === 'project_id') {
        if (!validator.isNumeric(String(inputValue[key]))) {
          errors[
            key
          ] = `Please provide a valid ${key},an ${key} can only be a number`;
        }
      }


      if (key === 'email') {
        if (!validator.isEmail(inputValue[key])) {
          errors[key] = `Invalid ${key}`;
        }
      }
      if (key === 'password') {
        if (!validator.isLength(inputValue[key], { min: 8, max: 50 })) {
          errors[key] = `${key} must between 8 and 50 characters`;
        }
      }
    }
  });
  return errors;
};
module.exports = checkInput;
