const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

const createQuestion = catchAsync(async (req, res) => {
  req.body.user = req.user._id;
  const question = await questionService.createQuestion(req.body);
  res.status(httpStatus.CREATED).send(question);
});

const getQuestions = catchAsync(async (req, res) => {
  const {limit, page, sortBy} = req.query;
  let options = {limit, page, sortBy};
  const result = await questionService.queryQuestions({}, options);
  res.send(result);
});


module.exports = {
  createQuestion,
  getQuestions
};