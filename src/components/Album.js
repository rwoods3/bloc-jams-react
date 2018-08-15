import React, {Component} from 'react';
import SongControl from './SongControl';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      icon: album.songs.map((song, index) => {
          return undefined;
        })
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;

    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handleMouseEnter(index) {
    const isSameSong = this.state.currentSong === this.state.album.songs[index];
    let newIcon = (isSameSong && this.state.isPlaying) ? 'icon ion-md-pause' : 'icon ion-md-play';
    let tempIcon = [...this.state.icon];
    tempIcon[index] = newIcon;
    this.setState({icon: tempIcon});
  }

  handleMouseLeave(index) {
    const isSameSong = this.state.currentSong === this.state.album.songs[index];
    const songIsPlaying = (isSameSong && this.state.isPlaying);
    let newIcon = !songIsPlaying ? undefined : 'icon ion-md-pause';
    let tempIcon = [...this.state.icon];
    tempIcon[index] = newIcon;
    this.setState({icon: tempIcon});
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>

        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            <tr>
              <th>Track #</th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
            {this.state.album.songs.map((song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                                               onMouseEnter={() => this.handleMouseEnter(index)}
                                               onMouseLeave={() => this.handleMouseLeave(index)}>
                <td><SongControl songIndex={index} icon={this.state.icon[index]}>{index+1}</SongControl></td>
                <td>{song.title}</td>
                <td>{song.duration}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
