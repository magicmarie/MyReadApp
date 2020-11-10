import React from 'react'
import PropTypes from 'prop-types';

import Book from './Book';

class BookShelf extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { shelfName, books } = this.props;
    console.log(books);
    console.log(shelfName);
    console.log(books.filter(book => console.log(book)));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === {shelfName}).map((book) =>
              <Book key={book.id} book={book} />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
