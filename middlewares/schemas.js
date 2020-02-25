const Joi = require('joi');
const schemas = {
  idDETAIL: {
    id: Joi.number()
      .min(1)
      .required()
  }
};
module.exports = schemas;
