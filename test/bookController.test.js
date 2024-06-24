const request = require("supertest");
const { v4: uuidv4 } = require("uuid");
const app = require("../app");
const books = require("../database/db");

// mock the uuid module to have a consistent id for easy testing
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("Book Controller", () => {
  beforeEach(() => {
    uuidv4.mockReturnValue("1234");

    // Initialize the books array before each test
    while (books.length > 0) {
      books.pop();
    }
  });

  test("GET /api/books should retrieve all books", async () => {
    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.results).toBe(0);
  });

  test("GET /api/books/:id should return a book", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };

    await request(app).post("/api/books").send(newBook);

    const response = await request(app).get("/api/books/1234");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toEqual({ id: "1234", ...newBook });
  });

  test("POST /api/books should create a new book", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };

    const responseOfPOST = await request(app).post("/api/books").send(newBook);
    expect(responseOfPOST.status).toBe(201);
    expect(responseOfPOST.body.status).toBe("success");
    expect(responseOfPOST.body.data).toEqual({ id: "1234", ...newBook });

    const responseOfGET = await request(app).get("/api/books");
    expect(responseOfGET.body.data).toContainEqual({ id: "1234", ...newBook });
  });

  test("POST /api/books should return with 400 when data has no title property", async () => {
    const newBook = {
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };

    const responseOfPOST = await request(app).post("/api/books").send(newBook);
    expect(responseOfPOST.status).toBe(400);
    expect(responseOfPOST.body.status).toBe("fail");
  });

  test("POST /api/books should return with 400 when data has no author property", async () => {
    const newBook = {
      title: "New Book",
      yearPublished: 2021,
      genre: "Non-fiction",
    };

    const responseOfPOST = await request(app).post("/api/books").send(newBook);
    expect(responseOfPOST.status).toBe(400);
    expect(responseOfPOST.body.status).toBe("fail");
  });

  test("POST /api/books should return with 400 when data has no yearPublished property", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      genre: "Non-fiction",
    };

    const responseOfPOST = await request(app).post("/api/books").send(newBook);
    expect(responseOfPOST.status).toBe(400);
    expect(responseOfPOST.body.status).toBe("fail");
  });

  test("POST /api/books should return with 400 when data has no genre property", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
    };

    const responseOfPOST = await request(app).post("/api/books").send(newBook);
    expect(responseOfPOST.status).toBe(400);
    expect(responseOfPOST.body.status).toBe("fail");
  });

  test("PUT /api/books/:id should return 404 if book is not found", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };
    const updatedBook = {
      title: "Updated Book",
      author: "Updated Author",
      yearPublished: 2022,
      genre: "Science",
    };

    await request(app).post("/api/books").send(newBook);
    const response = await request(app)
      .put("/api/books/5678")
      .send(updatedBook);
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("Book not found");
  });

  test("PUT /api/books/:id should return 400 if data is incomplete", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };
    const updatedBook = {
      author: "Updated Author",
      yearPublished: 2022,
      genre: "Science",
    };

    await request(app).post("/api/books").send(newBook);
    const response = await request(app)
      .put("/api/books/1234")
      .send(updatedBook);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe(
      "All fields are required: title, author, yearPublished, genre"
    );
  });

  test("PUT /api/books/:id should update a book", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };
    const updatedBook = {
      title: "Updated New Book",
      author: "Updated Author",
      yearPublished: 2022,
      genre: "Science",
    };

    await request(app).post("/api/books").send(newBook);
    const responseOfPUT = await request(app)
      .put("/api/books/1234")
      .send(updatedBook);

    expect(responseOfPUT.status).toBe(200);
    expect(responseOfPUT.body.status).toBe("success");

    expect(responseOfPUT.body.data).toEqual({ id: "1234", ...updatedBook });

    const responseOfGET = await request(app).get("/api/books");
    expect(responseOfGET.body.data).toContainEqual({
      id: "1234",
      ...updatedBook,
    });
  });

  test("DELETE /api/books/:id should delete a book", async () => {
    const newBook = {
      title: "New Book",
      author: "Author",
      yearPublished: 2021,
      genre: "Non-fiction",
    };

    await request(app).post("/api/books").send(newBook);

    const responseDEL = await request(app).delete("/api/books/1234");

    expect(responseDEL.status).toBe(204);
  });
});
