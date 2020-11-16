import React from 'react';
import { Link } from 'react-router-dom';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

import BookShelf from './BookShelf';
import * as BooksAPI from '../server/BooksAPI';

class BooksPage extends React.Component {

  state = {
    bookList: [],
    loading: true,
  }

  async getAllBooks() {
    try {
      return await BooksAPI.getAll().then(bookList => this.setState({ bookList }));
    } catch(e) {
      alert('Error getting your books');
    } finally {
      this.setState({ loading: false });
    }

  }

  handleOnChange = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf)
      .then(() => shelf !== 'none' ? alert(`${book.title} has been added to your ${shelf} shelf!`) : alert(' Beware! None has been chosen'))
      .then(() => this.getAllBooks());
    } catch(e) {
      alert('Error updating');
    }
  }

  componentDidMount() {
    this.getAllBooks();
  }
  render() {
    const { bookList } = this.state;

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <OverlayLoader
            loader="ScaleLoader"
            text="Loading... Please wait!"
            active={this.state.loading}
          >
            <div className="list-books-content">
              <BookShelf
                books={bookList.filter(book => book.shelf === 'currentlyReading')}
                shelfName='Currently Reading'
                handleOnChange={this.handleOnChange}
              />
              <BookShelf
                books={bookList.filter(book => book.shelf === 'wantToRead')}
                shelfName='Want to Read'
                handleOnChange={this.handleOnChange}
              />
              <BookShelf
                books={bookList.filter(book => book.shelf === 'read')}
                shelfName='Read'
                handleOnChange={this.handleOnChange}
              />
            </div>
          </OverlayLoader>
          <div className="open-search">
            <Link to='/search' >Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksPage;
