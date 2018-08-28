import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className="library">
      {
        this.state.albums.map((album, index) =>
          <Link key={index} to={`/album/${album.slug}`}>
            <div className="demo-card-image mdl-card mdl-shadow--2dp" style={{background: "url("+album.albumCover+") center / cover"}}>
              <div className="mdl-card__title mdl-card--expand">{album.title}</div>
              <div className="mdl-card__actions">
                <div className="demo-card-image__filename">{album.artist}</div>
                <div className="demo-card-image__filename">{album.songs.length} songs</div>
              </div>
            </div>
          </Link>
        )
      }
      </section>
    );
  }
}

export default Library;
