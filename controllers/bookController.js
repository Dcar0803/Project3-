const Book = require('../models/Book');

/**
 * Creates a new book in the library.
 * @param {object} req - The request object containing book details in `req.body`.
 * @param {object} res - The response object to send the newly created book or an error.
 * @returns {Promise<void>} Sends a JSON response with the created book or an error message.
 */
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all books in the library.
 * @param {object} req - The request object.
 * @param {object} res - The response object to send all books or an error.
 * @returns {Promise<void>} Sends a JSON response with an array of all books or an error message.
 */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a book by its ID.
 * @param {object} req - The request object containing `req.params.id`.
 * @param {object} res - The response object to send the found book or an error.
 * @returns {Promise<void>} Sends a JSON response with the book details or an error message.
 */
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a book by its ID.
 * @param {object} req - The request object containing `req.params.id` and `req.body`.
 * @param {object} res - The response object to send the updated book or an error.
 * @returns {Promise<void>} Sends a JSON response with the updated book or an error message.
 */
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a book by its ID.
 * @param {object} req - The request object containing `req.params.id`.
 * @param {object} res - The response object to confirm deletion or send an error.
 * @returns {Promise<void>} Sends a JSON response with a confirmation message or an error message.
 */
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
