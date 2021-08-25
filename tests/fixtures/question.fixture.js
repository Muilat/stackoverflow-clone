const mongoose = require('mongoose');
const faker = require('faker');
const Question = require('../../src/models/question.model');

const questionOne = {
  _id: mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  body: faker.lorem.sentences(),
  user: '612648a0533c352b90f4cd7d',
  tags: ['612648a0533c352b90f4cd7d']
};

const createQuestion = async (question) => {
  await Question.create(question);
};

module.exports = {
  questionOne, createQuestion
};
