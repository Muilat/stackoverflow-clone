const Joi = require('joi');

const createTag = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    excerpt: Joi.string().required(),
  }),
};

module.exports = {
  createTag,
};
