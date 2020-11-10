import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../css/App.css'
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  showSearch = () => {
    this.setState({showSearchPage: false});
  }

  render() {
    const { showSearchPage } = this.state;
    return (
      <div className="app">
        { showSearchPage && <SearchPage/> }
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf/>
            <BookShelf/>
            <BookShelf/>
          </div>
          <div className="open-search">
            <button onClick={this.showSearch}>Add a book</button>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
