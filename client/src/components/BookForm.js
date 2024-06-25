import "./BookForm.scss";
import React from "react";

const BookForm = ({
  handleSubmit,
  setFormValue,
  formValue,
  FormTitle,
  errors,
}) => {
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
      <form onSubmit={handleSubmit} autocomplete="off">
        <div className="book-form__field">
          <label className="book-form__label">Title</label>
          <input
            className="book-form__input"
            name="title"
            placeholder="Title"
            value={formValue.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="book-form__error">{errors.title}</div>
          )}
        </div>
        <div className="book-form__field">
          <label className="book-form__label">Author</label>
          <input
            className="book-form__input"
            name="author"
            placeholder="Author"
            value={formValue.author}
            onChange={handleChange}
          />
          {errors.author && (
            <div className="book-form__error">{errors.author}</div>
          )}
        </div>
        <div className="book-form__field">
          <label className="book-form__label">Year Published</label>
          <input
            className="book-form__input"
            type="number"
            name="yearPublished"
            placeholder="Year Published"
            value={formValue.yearPublished}
            onChange={handleChange}
            min="1"
          />
          {errors.yearPublished && (
            <div className="book-form__error">{errors.yearPublished}</div>
          )}
        </div>
        <div className="book-form__field">
          <label className="book-form__label">Genre</label>
          <input
            className="book-form__input"
            name="genre"
            placeholder="Genre"
            value={formValue.genre}
            onChange={handleChange}
          />
          {errors.genre && (
            <div className="book-form__error">{errors.genre}</div>
          )}
        </div>
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
