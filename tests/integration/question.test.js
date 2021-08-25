const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { question } = require('../../src/models');
const { questionOne,  } = require('../fixtures/question.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const { createQuestion } = require('../../src/services/question.service');

setupTestDB();

describe('question routes', () => {
  describe('POST /v1/questions', () => {
    let newquestion;

    beforeEach(() => {
      newquestion = {
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        user: '612648a0533c352b90f4cd7d',
        tags: ['612648a0533c352b90f4cd7d']
      };
    });

    

    test('should return 401 error if token is missing', async () => {
      await createQuestion(newquestion);

      await request(app)
        .post('/v1/questions')
        .send(newquestion)
        .expect(httpStatus.UNAUTHORIZED);
    });

  });

  describe('GET /v1/questions', () => {
    let newquestion;

    beforeEach(() => {
      newquestion = {
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        user: '612648a0533c352b90f4cd7d',
        tags: ['612648a0533c352b90f4cd7d']
      };
    });

    test('should return 200 and apply the default query options', async () => {
      await createQuestion(newquestion)

      const res = await request(app)
        .get('/v1/questions')
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      
    });

    

  });

});
