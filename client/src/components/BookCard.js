import "./BookCard.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../store";
import Modal from "./Modal";

const BookCard = ({ book }) => {
  const deleteBook = useStore((state) => state.deleteBook);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState(null);

  const handleDeleteBook = (id) => {
    setBookIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookIdToDelete(null);
  };

  const confirmDelete = () => {
    deleteBook(bookIdToDelete);
    closeModal();
  };

  return (
    <div className="card">
      <h3 className="card__label">Title</h3>
      <div className="card__title">{book.title}</div>
      <h3 className="card__label">Author</h3>
      <div className="card__author">{book.author}</div>
      <h3 className="card__label">Year Published</h3>
      <div className="card__year">{book.yearPublished}</div>
      <h3 className="card__label">Genre</h3>
      <div className="card__genre">{book.genre}</div>
      <div className="card__btns">
        <NavLink to={`/books/${book.id}/edit`} className="card__btns-link">
          <div className="card__btns-edit">Edit</div>
        </NavLink>
        <div
          onClick={() => handleDeleteBook(book.id)}
          className="card__btns-link"
        >
          <div className="card__btns-delete">Delete</div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onClose={closeModal}
      >
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete this book?</p>
      </Modal>
    </div>
  );
};

export default BookCard;
