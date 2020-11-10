import React from 'react';

import BookShelf from './BookShelf';
import * as BooksAPI from '../server/BooksAPI';
import SearchPage from './SearchPage';

class BooksPage extends React.Component {

  state = {
    showSearchPage: false,
    bookList: []
  }

  showSearch = () => {
    this.setState({showSearchPage: true});
  }

  componentDidMount() {
    BooksAPI.getAll().then(bookList => this.setState({ bookList }));
  }
  render() {
    const { showSearchPage, bookList } = this.state;

    return (
      <div>
        {showSearchPage && <SearchPage/>}
        {!showSearchPage &&
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                books={bookList}
                shelfName='Currently Reading'
              />
              <BookShelf
                books={bookList}
                shelfName='Want to Read'
              />
              <BookShelf
                books={bookList}
                shelfName='Read'
              />
            </div>
            <div className="open-search">
              <button onClick={this.showSearch}>Add a book</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default BooksPage;
