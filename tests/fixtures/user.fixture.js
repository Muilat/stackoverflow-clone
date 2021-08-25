const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../../src/models/user.model');


const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: "password1",
  isEmailVerified: false,
};

const createUser = async (user) => {
  await User.create(user);
};

module.exports = {
  userOne,
  createUser,
};
