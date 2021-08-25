const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    infoUrl: {
      type: String,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    // isNew: {
    //   type: Boolean,
    //   default: false,
    // },
    isDeverged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tagSchema.plugin(toJSON);
tagSchema.plugin(paginate);

/**
 * Check if tag already exist
 * @param {string} name - The tag
 * @param {ObjectId} [excludeTagId] - The id of the tag to be excluded
 * @returns {Promise<boolean>}
 */
tagSchema.statics.doesTagAlreadyExist = async function (name, excludeTagId) {
  const tag = await this.findOne({ name, _id: { $ne: excludeTagId } });
  return !!tag;
};


tagSchema.pre('save', async function (next) {
  const tag = this;
    tag.infoUrl = `/tags/${tag.name}/info`
  next();
});

/**
 * @typedef Tag
 */
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
