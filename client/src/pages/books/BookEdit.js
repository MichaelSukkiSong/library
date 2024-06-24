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
  const [errors, setErrors] = useState({});
  const updateBook = useStore((state) => state.updateBook);
  let navigate = useNavigate();
  let { id } = useParams();

  const validate = () => {
    let tempErrors = {};

    if (!formValue.title) {
      tempErrors.title = "Title is required";
    }
    if (!formValue.author) {
      tempErrors.author = "Author is required";
    }
    if (!formValue.yearPublished) {
      tempErrors.yearPublished = "Year Published is required";
    } else if (formValue.yearPublished < 0) {
      tempErrors.yearPublished = "Year Published should be a reasonable year";
    }

    if (!formValue.genre) {
      tempErrors.genre = "Genre is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

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

    if (!validate()) return;

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
        errors={errors}
      />
    </div>
  );
};

export default BookEdit;
