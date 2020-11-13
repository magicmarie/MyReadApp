import React from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from '../server/BooksAPI';

class SearchPage extends React.Component {

  state = {
    searchResults: [],
    books: [],
    search: '',
  }

  handleSearch = (search) => {
    this.setState({ search: search.trim() });

    BooksAPI.search(search).then(books => {
        this.setState({ books });
      });
  }

  handleOnChange(book, e) {
    BooksAPI.update(book, e.target.value)
      .then(() => e.target.name !== 'none' ? alert(`${book.title} added to ${e.target.value} shelf!`) : alert('None chosen'));
  }

  render() {
    const { search, books } = this.state;
    console.log(books);

    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={(e) => this.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              Boolean(search) && books.length === 0 && (
                <p>No results for this search</p>
              )
            }
            {
              Boolean(search) && books.length > 0 &&
              (books.map((book) =>
                <Book
                  key={book.id}
                  book={book}
                  handleOnChange={(book, e) => this.handleOnChange(book, e.target.value)}
                />
                )
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
