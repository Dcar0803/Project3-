const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Staff = require('../models/Staff');

let staffId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the database and create a new staff member
  await Staff.deleteMany({});
  const staff = new Staff({ name: 'John Doe', position: 'Librarian' });
  const savedStaff = await staff.save();
  staffId = savedStaff._id.toString(); // Save the staff ID for use in tests
});

test('should create a new staff member', async () => {
  const response = await request(app)
    .post('/api/staff')
    .send({ name: 'Jane Doe', position: 'Assistant Librarian' });

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body).toHaveProperty('name', 'Jane Doe');
});

test('should retrieve all staff members', async () => {
  const response = await request(app).get('/api/staff');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

test('should retrieve a staff member by ID', async () => {
  const response = await request(app).get(`/api/staff/${staffId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('_id', staffId);
});

test('should update a staff member by ID', async () => {
  const response = await request(app)
    .put(`/api/staff/${staffId}`)
    .send({ position: 'Senior Librarian' });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('position', 'Senior Librarian');
});

test('should delete a staff member by ID', async () => {
  const response = await request(app).delete(`/api/staff/${staffId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('message', 'Staff deleted successfully');
});
