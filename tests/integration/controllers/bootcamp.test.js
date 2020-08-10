const request = require('supertest');
const mongoose = require('mongoose');
const Bootcamp = require('../../../models/Bootcamps');

describe('/api/v1/bootcamps', () => {
  beforeEach(() => {
    server = require('../../../server');
  });
  afterEach(async () => {
    server.close();
    // await Bootcamp.remove({});
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
      const bootcamp = new Bootcamp({
        name: 'Test Bootcamp',
        description:
          'Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development',
        website: 'https://devcentral.com',
        phone: '(444) 444-4444',
        email: 'enroll@devcentral.com',
        address: '45 Upper College Rd Kingston RI 02881',
        careers: [
          'Mobile Development',
          'Web Development',
          'Data Science',
          'Business',
        ],
        housing: false,
        jobAssistance: true,
        jobGuarantee: true,
        acceptGi: true,
        user: mongoose.Types.ObjectId(),
      });
      await bootcamp.save();

      const res = await request(server).get('/api/bootcamps/' + bootcamp._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', bootcamp.name);
    });
  });
});
