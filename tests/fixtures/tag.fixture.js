const mongoose = require('mongoose');
const faker = require('faker');
const Tag = require('../../src/models/tag.model');


const tagOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.lorem.word(2),
  excerpt: faker.lorem.sentences(),
  isDeverged: false,
  infoUrl: `/dew`
};

const createTag = async (tag) => {
  await Tag.create(tag);
};

module.exports = {
  tagOne, createTag
};
