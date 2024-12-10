const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Member = require('../models/Member');

let memberId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the database and create a new member
  await Member.deleteMany({});
  const member = new Member({
    name: 'John Doe',
    membershipType: 'Standard',
    isActive: true,
  });
  const savedMember = await member.save();
  memberId = savedMember._id.toString(); // Save the member ID for use in tests
});

test('should create a new member', async () => {
  const response = await request(app)
    .post('/api/members')
    .send({
      name: 'Jane Doe',
      membershipType: 'Premium',
      isActive: true,
    });

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body).toHaveProperty('name', 'Jane Doe');
});

test('should retrieve all members', async () => {
  const response = await request(app).get('/api/members');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

test('should retrieve a member by ID', async () => {
  const response = await request(app).get(`/api/members/${memberId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('_id', memberId);
});

test('should update a member by ID', async () => {
  const response = await request(app)
    .put(`/api/members/${memberId}`)
    .send({ name: 'Updated Name' });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('name', 'Updated Name');
});

test('should delete a member by ID', async () => {
  const response = await request(app).delete(`/api/members/${memberId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('message', 'Member deleted successfully');
});
