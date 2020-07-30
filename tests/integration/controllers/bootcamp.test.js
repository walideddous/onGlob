const request = require('supertest');
const Bootcamp = require('../../../models/Bootcamps');
const { getMaxListeners } = require('../../../server');

describe('/api/v1/bootcamps', () => {
  beforeEach(() => {
    server = require('../../../server');
  });
  afterEach(async () => {
    server.close();
    await Bootcamp.remove({});
  });
  describe('GET', () => {
    it('Should return 200 if all bootcamps returned', async () => {
      await Bootcamp.collection.insertMany([
        { name: 'bootcamp1' },
        { name: 'bootcamp2' },
      ]);
      const res = await request(server).get('/api/v1/bootcamps');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some((g) => g.name === 'bootcamp1')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('Should return a valid bootcamp if id is valid', async () => {
      const bootcamp = await Bootcamp.create({
        name: 'bootcamp1',
        description: 'description of bootcamp1',
      });

      const res = await request(server).get(
        '/api/v1/bootcamps/' + bootcamp._id
      );

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('name', bootcamp.name);
    });
  });
});
