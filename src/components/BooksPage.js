import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';
import * as BooksAPI from '../server/BooksAPI';

class BooksPage extends React.Component {

  state = {
    bookList: [],
  }

  getAllBooks() {
    BooksAPI.getAll().then(bookList => this.setState({ bookList }));
  }

  handleOnChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.getAllBooks());
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
          <div className="open-search">
            <Link to='/search' >Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksPage;
