import "./BookEdit.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store";
import BookForm from "../../components/BookForm";

const BookEdit = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    author: "",
    yearPublished: "",
    genre: "",
  });
  const updateBook = useStore((state) => state.updateBook);
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await axios.get(`/api/books/${id}`);
      const book = response.data.data;
      setFormValue({
        title: book.title,
        author: book.author,
        yearPublished: book.yearPublished,
        genre: book.genre,
      });
    };

    fetchBookData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBook(id, formValue);
    navigate("/books");
  };

  return (
    <div className="form-container">
      <BookForm
        handleSubmit={handleSubmit}
        setFormValue={setFormValue}
        formValue={formValue}
        FormTitle="Edit Book"
      />
    </div>
  );
};

export default BookEdit;
