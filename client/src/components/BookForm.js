import "./BookForm.scss";
import React from "react";

const BookForm = ({ handleSubmit, setFormValue, formValue, FormTitle }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div className="book-form">
      <h1 className="book-form__title">{FormTitle}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="book-form__input"
          name="title"
          placeholder="Title"
          value={formValue.title}
          onChange={handleChange}
          required
        />
        <input
          className="book-form__input"
          name="author"
          placeholder="Author"
          value={formValue.author}
          onChange={handleChange}
          required
        />
        <input
          className="book-form__input"
          type="number"
          name="yearPublished"
          placeholder="Year Published"
          value={formValue.yearPublished}
          onChange={handleChange}
          required
        />
        <input
          className="book-form__input"
          name="genre"
          placeholder="Genre"
          value={formValue.genre}
          onChange={handleChange}
          required
        />
        <div className="book-form__button-section">
          <button className="book-form__button" type="submit">
            {FormTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
