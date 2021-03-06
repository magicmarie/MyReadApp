import React from 'react';
import { Link } from 'react-router-dom';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

import Book from './Book';
import * as BooksAPI from '../server/BooksAPI';

class SearchPage extends React.Component {

  state = {
    bookList: [],
    search: '',
    loading: false,
  }

  handleSearch = async (search) => {
    try{
      this.setState({ search, loading: true });

    await BooksAPI.search(search).then(books => {
      books instanceof Array ? this.shelfUpdate(books) : this.setState({bookList: []});
      });
    } finally {
      this.setState({loading: false });
    }
  }

  shelfUpdate = (books) => {
    const bookList = (books).map(book => {
      for(let bookOnShelf of this.props.books) {
        if(bookOnShelf.id === book.id) {
          book.shelf = bookOnShelf.shelf
          break;
        } else {
          book.shelf = 'none'
          continue;
        }
      }
      return book;
    })
    this.setState({ bookList });
  }

  render() {
    const { handleOnChange } = this.props;
    const { search, bookList, loading } = this.state;

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
        <OverlayLoader
          loader="ScaleLoader"
          text="Loading... Please wait!"
          active={loading}>
          <div className="search-books-results">
            <ol className="books-grid">
              {bookList.length === 0 && (<p>No results yet</p>)}
              {
                bookList.length > 0 &&
                (bookList.map((book) =>
                  <Book
                    key={book.id}
                    book={book}
                    handleOnChange={handleOnChange}
                  />
                  )
                )
              }
            </ol>
          </div>
        </OverlayLoader>
      </div>
    )
  }
}

export default SearchPage;
