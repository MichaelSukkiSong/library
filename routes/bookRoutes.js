/*
• GET /api/books - Retrieves all books.
• POST /api/books - Adds a new book.
• PUT /api/books/:id - Updates an existing book.
• DELETE /api/books/:id - Deletes a book.
*/

const express = require("express");
const bookController = require("./../controllers/bookController");

const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route("/:id")
  .get(bookController.getBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
