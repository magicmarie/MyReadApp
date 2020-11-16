import React from 'react';
import { Link } from 'react-router-dom';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

const BooksPage = ({ books, handleOnChange, loading }) => {
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
            <BookShelf
              books={books.filter(book => book.shelf === 'currentlyReading')}
              shelfName='Currently Reading'
              handleOnChange={handleOnChange}
            />
            <BookShelf
              books={books.filter(book => book.shelf === 'wantToRead')}
              shelfName='Want to Read'
              handleOnChange={handleOnChange}
            />
            <BookShelf
              books={books.filter(book => book.shelf === 'read')}
              shelfName='Read'
              handleOnChange={handleOnChange}
            />
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
