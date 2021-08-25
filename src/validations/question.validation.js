const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTag = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().$.custom(objectId),
  }),
};

module.exports = {
  createTag,
};
