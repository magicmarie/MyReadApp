import React from 'react';
import { Link } from 'react-router-dom';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

const BooksPage = ({ books, handleOnChange, loading }) => {
  const shelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
  ];

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <OverlayLoader
          loader="ScaleLoader"
          text="Loading... Please wait!"
          active={loading}
        >
          <div className="list-books-content">
            {shelves.map((shelf, index) => (
              <BookShelf
                key={index}
                books={books.filter(book => book.shelf === shelf.key)}
                shelfName={shelf.name}
                handleOnChange={handleOnChange}
              />
            ))}
          </div>
        </OverlayLoader>
        <div className="open-search">
          <Link to='/search'  >Add a book</Link>
        </div>
      </div>
    </div>
  )
}

BooksPage.propTypes = {
  bookList: PropTypes.array,
  loading: PropTypes.bool,
  handleOnChange: PropTypes.func.isRequired,
}

BooksPage.defaultProps = {
  bookList: [],
  loading: true,
}

export default BooksPage;
