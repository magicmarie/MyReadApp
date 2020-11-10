import React from 'react'

import Book from './Book';

class BookShelf extends React.Component {
  render() {
    const { shelfName } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book/>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
