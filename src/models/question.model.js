const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Tag',
    }],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    answerCount: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    infoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);


questionSchema.pre('save', async function (next) {
  const question = this;
    question.infoUrl = `/questions/${question.id}/${question.title.replace(' ', '-')}`
    //TODO::remove
    question.name =question.title.replace(' ', '-')
  next();
});

/**
 * @typedef Question
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
