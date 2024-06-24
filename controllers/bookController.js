const { v4: uuidv4 } = require("uuid");
const catchAsync = require("../utils/catchAsync");
const books = require("../database/db");
/*
Each book should have the following properties: 
• Title
• Author
• Year Published
• Genre
*/

exports.getAllBooks = catchAsync(async (req, res) => {
  // Retrieves all books
  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
});

exports.getBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found",
    });
  }

  const book = books[index];

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.createBook = catchAsync(async (req, res) => {
  const { title, author, yearPublished, genre } = req.body;

  // Validate incoming data
  if (!title || !author || !yearPublished || !genre) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required: title, author, yearPublished, genre",
    });
  }

  // Adds a new book
  const newBook = { id: uuidv4(), title, author, yearPublished, genre };
  books.push(newBook);

  res.status(201).json({
    status: "success",
    data: newBook,
  });
});

exports.updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, author, yearPublished, genre } = req.body;

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found",
    });
  }

  // Validate incoming data
  if (!title || !author || !yearPublished || !genre) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required: title, author, yearPublished, genre",
    });
  }

  const updatedBook = { id, title, author, yearPublished, genre };
  books[index] = updatedBook;

  res.status(200).json({
    status: "success",
    data: updatedBook,
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found",
    });
  }

  books.splice(index, 1);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
