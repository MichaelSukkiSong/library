import "./BookNew.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import BookForm from "../../components/BookForm";

const BookNew = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    author: "",
    yearPublished: "",
    genre: "",
  });
  const [errors, setErrors] = useState({});
  const addBook = useStore((state) => state.addBook);
  let navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addBook(formValue);
    navigate("/books");
  };

  return (
    <div className="form-container">
      <BookForm
        handleSubmit={handleSubmit}
        setFormValue={setFormValue}
        formValue={formValue}
        FormTitle="Add Book"
        errors={errors}
      />
    </div>
  );
};

export default BookNew;
