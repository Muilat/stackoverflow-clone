const faker = require('faker');
const { Question } = require('../../../src/models');

describe('Question model', () => {
  describe('Question validation', () => {
    let newQuestion;
    beforeEach(() => {
      newQuestion = {
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        user: '612648a0533c352b90f4cd7d',
        tags: ['612648a0533c352b90f4cd7d']
      };
    });

    test('should correctly validate a valid Question', async () => {
      await expect(new Question(newQuestion).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if title is null', async () => {
      newQuestion.title = null;
      await expect(new Question(newQuestion).validate()).rejects.toThrow();
    });

    test('should throw a validation error if body is null', async () => {
      newQuestion.body =null;
      await expect(new Question(newQuestion).validate()).rejects.toThrow();
    });

    test('should throw an error if user is null', async () => {
      newQuestion.user = null;
      await expect(new Question(newQuestion).validate()).rejects.toThrow();
    });

    
    
  });

  describe('Question toJSON()', () => {
    test('should return Question with id when toJSON is called', () => {
      const newQuestion = {
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        user: '612648a0533c352b90f4cd7d',
        tags: ['612648a0533c352b90f4cd7d']
      };
      expect(new Question(newQuestion).toJSON()).toString().includes('id');
    });
  });
});
