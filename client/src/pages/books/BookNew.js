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
  const addBook = useStore((state) => state.addBook);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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
      />
    </div>
  );
};

export default BookNew;
