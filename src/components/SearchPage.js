import React from 'react';
import { Link } from 'react-router-dom';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

import Book from './Book';
import * as BooksAPI from '../server/BooksAPI';

class SearchPage extends React.Component {

  state = {
    books: [],
    search: '',
    loading: false,
  }

  handleSearch = async (search) => {
    try{
      this.setState({ search, loading: true });

    await BooksAPI.search(search).then(books => {
        this.setState({ books });
      });
    } catch(e) {
      alert("Error searching");
    } finally {
      this.setState({loading: false });
    }

  }

  render() {
    const { handleOnChange } = this.props;
    const { search, books } = this.state;

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
          active={this.state.loading}>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                Boolean(search) && books.length > 0 &&
                (books.map((book) =>
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
