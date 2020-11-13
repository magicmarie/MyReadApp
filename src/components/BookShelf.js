import React from 'react'
import PropTypes from 'prop-types';

import Book from './Book';

const BookShelf = ({ shelfName, books, handleOnChange}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) =>
            <Book
              key={book.id}
              book={book}
              handleOnChange={handleOnChange}
            />
          )}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func,
}

export default BookShelf;
