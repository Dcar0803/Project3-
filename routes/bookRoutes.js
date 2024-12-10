const express = require('express');
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

/**
 * @route POST /api/books
 * @description Creates a new book.
 */
router.post('/', createBook);

/**
 * @route GET /api/books
 * @description Retrieves all books.
 */
router.get('/', getBooks);

/**
 * @route GET /api/books/:id
 * @description Retrieves a book by ID.
 */
router.get('/:id', getBookById);

/**
 * @route PUT /api/books/:id
 * @description Updates a book by ID.
 */
router.put('/:id', updateBook);

/**
 * @route DELETE /api/books/:id
 * @description Deletes a book by ID.
 */
router.delete('/:id', deleteBook);

module.exports = router;
