const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Tag } = require('../../src/models');
const { tagOne,  } = require('../fixtures/tag.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const { createTag } = require('../../src/services/tag.service');

setupTestDB();

describe('tag routes', () => {
  describe('POST /v1/tags', () => {
    let newtag;

    beforeEach(() => {
      newtag = {
        name: faker.lorem.word(2),
        excerpt: faker.lorem.sentences()
      };
    });

    test('should return 201 and successfully create new tag if data is ok', async () => {
      // await createTag(newtag);

      const res = await request(app)
        .post('/v1/tags')
        .send(newtag)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        infoUrl: expect.anything(),
        name: newtag.name,
        excerpt: newtag.excerpt,
        count: 0,
      isDeverged: false,
      });

      const dbtag = await Tag.findById(res.body.id);
      expect(dbtag).toBeDefined();
      expect(dbtag).toMatchObject({ name: newtag.name, excerpt: newtag.excerpt, count:0 });
    });

    
    test('should return 400 error if name is invalid', async () => {
      await createTag(newtag);
      newtag.name = null;

      await request(app)
        .post('/v1/tags')
        .send(newtag)
        .expect(httpStatus.BAD_REQUEST);
    });

  });

  describe('GET /v1/tags', () => {
    let newtag;

    beforeEach(() => {
      newtag = {
        name: faker.lorem.word(2),
        excerpt: faker.lorem.sentences()
      };
    });

    test('should return 200 and apply the default query options', async () => {
      await createTag(tagOne)

      const res = await request(app)
        .get('/v1/tags?tag='+tagOne.name)
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
      expect(res.body.results[0]).toEqual({
        id: tagOne._id.toHexString(),
        name: tagOne.name,
        excerpt: tagOne.excerpt,
        count: 0,
        isDeverged: tagOne.isDeverged,
        infoUrl: expect.anything()
      });
    });


  });

});
