import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing.js';
import Library from './components/Library.js';
import Album from './components/Album.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="mdl-layout mdl-js-layout">
      <header className="mdl-layout__header mdl-layout__header--scroll">
        <div className="mdl-layout__header-row">

          <span className="mdl-layout-title">Bloc Jams</span>

          <div className="mdl-layout-spacer"></div>

          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href=""><Link to='/'>Landing</Link></a>
            <a className="mdl-navigation__link" href=""><Link to='/library'>Library</Link></a>
          </nav>
        </div>
      </header>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Bloc Jams</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href=""><Link to='/'>Landing</Link></a>
          <a className="mdl-navigation__link" href=""><Link to='/library'>Library</Link></a>
        </nav>
      </div>
      <main className="mdl-layout__content">
        <div className="page-content">
          <main>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
          </main>
        </div>
      </main>
      </div>

      </div>
    );
  }
}

export default App;
