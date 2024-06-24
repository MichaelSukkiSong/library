import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  books: [],
  fetchBooks: async () => {
    try {
      const response = await axios.get("/api/books");
      set({ books: response.data.data });
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  },
  addBook: async (book) => {
    try {
      const response = await axios.post("/api/books", book, {
        headers: { "Content-Type": "application/json" },
      });
      set((state) => ({ books: [...state.books, response.data.data] }));
    } catch (error) {
      console.error("Failed to add book", error);
    }
  },
  updateBook: async (id, updatedBook) => {
    try {
      const response = await axios.put(`/api/books/${id}`, updatedBook, {
        headers: { "Content-Type": "application/json" },
      });
      set((state) => ({
        books: state.books.map((book) =>
          book.id === id ? response.data.data : book
        ),
      }));
    } catch (error) {
      console.error("Failed to update book", error);
    }
  },
  deleteBook: async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      set((state) => ({ books: state.books.filter((book) => book.id !== id) }));
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  },
}));

export default useStore;
