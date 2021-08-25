const faker = require('faker');
const { Tag } = require('../../../src/models');

describe('Tag model', () => {
  describe('Tag validation', () => {
    let newTag;
    beforeEach(() => {
      newTag = {
        name: faker.lorem.word(2),
        excerpt: faker.lorem.sentences(),
      };
    });

    test('should correctly validate a valid Tag', async () => {
      await expect(new Tag(newTag).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name is null', async () => {
      newTag.name = null;
      await expect(new Tag(newTag).validate()).rejects.toThrow();
    });

    test('should throw a validation error if excerpt is null', async () => {
      newTag.excerpt = null;
      await expect(new Tag(newTag).validate()).rejects.toThrow();
    });

    
    
  });

  describe('Tag toJSON()', () => {
    test('should return Tag with id when toJSON is called', () => {
      const newTag = {
        name: faker.lorem.sentence(),
        excerpt: faker.lorem.sentences(),
        tags: 'vbr6ni6ti7imniyb6nihy'
      };
      expect(new Tag(newTag).toJSON()).toString().includes('id');
    });
  });
});
