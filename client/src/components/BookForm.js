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
          <label className="book-form__label" htmlFor="title">
            Title
          </label>
          <input
            className="book-form__input"
            name="title"
            id="title"
            placeholder="Title"
            value={formValue.title}
            onChange={handleChange}
            tabIndex="0"
          />
          {errors.title && (
            <div className="book-form__error" aria-live="polite">
              {errors.title}
            </div>
          )}
        </div>
        <div className="book-form__field">
          <label className="book-form__label" htmlFor="author">
            Author
          </label>
          <input
            className="book-form__input"
            name="author"
            id="author"
            placeholder="Author"
            value={formValue.author}
            onChange={handleChange}
            tabIndex="0"
          />
          {errors.author && (
            <div className="book-form__error" aria-live="polite">
              {errors.author}
            </div>
          )}
        </div>
        <div className="book-form__field">
          <label className="book-form__label" htmlFor="yearPublished">
            Year Published
          </label>
          <input
            className="book-form__input"
            type="number"
            name="yearPublished"
            id="yearPublished"
            placeholder="Year Published"
            value={formValue.yearPublished}
            onChange={handleChange}
            min="1"
            tabIndex="0"
          />
          {errors.yearPublished && (
            <div className="book-form__error" aria-live="polite">
              {errors.yearPublished}
            </div>
          )}
        </div>
        <div className="book-form__field">
          <label className="book-form__label" htmlFor="genre">
            Genre
          </label>
          <input
            className="book-form__input"
            name="genre"
            id="genre"
            placeholder="Genre"
            value={formValue.genre}
            onChange={handleChange}
            tabIndex="0"
          />
          {errors.genre && (
            <div className="book-form__error" aria-live="polite">
              {errors.genre}
            </div>
          )}
        </div>
        <div className="book-form__button-section">
          <button className="book-form__button" type="submit" tabIndex="0">
            {FormTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
