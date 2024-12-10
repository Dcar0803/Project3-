const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Book = require('../models/Book');

let bookId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the database and create a new book
  await Book.deleteMany({});
  const book = new Book({
    title: 'Test Book',
    author: 'John Doe',
    genre: 'Fiction',
    publishedYear: 2020,
  });
  const savedBook = await book.save();
  bookId = savedBook._id.toString(); // Save the book ID for use in tests
});

test('should create a new book', async () => {
  const response = await request(app)
    .post('/api/books')
    .send({
      title: 'New Book',
      author: 'Jane Doe',
      genre: 'Non-Fiction',
      publishedYear: 2021,
    });

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body).toHaveProperty('title', 'New Book');
});

test('should retrieve all books', async () => {
  const response = await request(app).get('/api/books');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

test('should retrieve a book by ID', async () => {
  const response = await request(app).get(`/api/books/${bookId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('_id', bookId);
});

test('should update a book by ID', async () => {
  const response = await request(app)
    .put(`/api/books/${bookId}`)
    .send({ title: 'Updated Book Title' });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('title', 'Updated Book Title');
});

test('should delete a book by ID', async () => {
  const response = await request(app).delete(`/api/books/${bookId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('message', 'Book deleted successfully');
});
