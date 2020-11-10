import React from 'react'
import { Route } from 'react-router-dom';

import '../css/App.css'
import SearchPage from './SearchPage';
import BooksPage from './BooksPage';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact component={BooksPage} />
        <Route path="/search" exact component={SearchPage}/>
      </div>
    )
  }
}

export default BooksApp;
