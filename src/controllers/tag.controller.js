const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tagService } = require('../services');

const createTag = catchAsync(async (req, res) => {
  const tag = await tagService.createTag(req.body);
  res.status(httpStatus.CREATED).send(tag);
});

const getTags = catchAsync(async (req, res) => {
  const {tag} = req.query;
  //TODO::change to complete case insensitive
  let filter = {name: tag};
  const result = await tagService.queryTags(filter, {});
  res.send(result);
});


module.exports = {
  createTag,
  getTags
};