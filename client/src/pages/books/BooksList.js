import "./BooksList.scss";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../store";
import BookCard from "../../components/BookCard";
import { FaPlusCircle } from "../../styles/icons";

const BooksList = () => {
  const fetchBooks = useStore((state) => state.fetchBooks);
  const books = useStore((state) => state.books);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBooks();
    };

    fetchData();
  }, []);

  const renderBooks = () => {
    return books.map((book) => {
      return <BookCard book={book} key={book.id} />;
    });
  };

  return (
    <div>
      <div className="create-btn__section">
        <NavLink to="/books/new" className="create-btn__link">
          <div className="create-btn">
            <FaPlusCircle />
            <span>Create</span>
          </div>
        </NavLink>
      </div>
      <div className="container">{renderBooks()}</div>
    </div>
  );
};

export default BooksList;
