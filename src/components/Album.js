import React, {Component} from 'react';
import SongControl from './SongControl';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
      currentHoveredIndex: -1,
      currentPlayingIndex: 0,
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

  handleSongClick(song, index) {
    const isSameSong = this.state.currentSong === song;

    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.setState({currentHoveredIndex: index});
    } else {
      if (!isSameSong) {
        this.setSong(song);
        this.setState({currentHoveredIndex: -1});
      }
      this.setState({currentPlayingIndex: index});
      this.setState({currentHoveredIndex: -1});
      this.play();
    }
  }

  handleMouseEnter(index) {
    this.setState({currentHoveredIndex: index});

  }

  handleMouseLeave(index) {
    this.setState({currentHoveredIndex: -1});
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.setState({currentPlayingIndex: newIndex, currentHoveredIndex: -1});
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const totalSongs = this.state.album.songs.length-1;
    const newIndex = Math.min(totalSongs, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.setState({currentPlayingIndex: newIndex, currentHoveredIndex: -1});
    this.play();
  }

  getIcon(index) {
    if(index === this.state.currentHoveredIndex) {
      return 'icon ion-md-play';
    }

    if(index === this.state.currentPlayingIndex && this.state.isPlaying) {
      return 'icon ion-md-pause';
    }
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
              <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)}
                                               onMouseEnter={() => this.handleMouseEnter(index)}
                                               onMouseLeave={() => this.handleMouseLeave(index)}>
                <td><SongControl songIndex={index} icon={this.getIcon(index)}>{index+1}</SongControl></td>
                <td>{song.title}</td>
                <td>{song.duration}</td>
              </tr>
            )}
          </tbody>
        </table>
        <PlayerBar isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong, this.state.currentPlayingIndex)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()} />
      </section>
    );
  }
}

export default Album;
