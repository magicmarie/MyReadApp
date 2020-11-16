import React from 'react'
import { Route } from 'react-router-dom';

import '../css/App.css'
import SearchPage from './SearchPage';
import BooksPage from './BooksPage';
import * as BooksAPI from '../server/BooksAPI';

class BooksApp extends React.Component {

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
    const { bookList, loading } = this.state;
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => <BooksPage books={bookList} handleOnChange={this.handleOnChange} loading={loading} />}
        />
        <Route
          path="/search"
          exact
          render={() => <SearchPage books={bookList} handleOnChange={this.handleOnChange} loading={loading} />}
        />
      </div>
    )
  }
}

export default BooksApp;
