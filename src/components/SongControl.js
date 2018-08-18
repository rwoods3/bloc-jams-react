import React, {Component} from 'react';

class SongControl extends Component {
  constructor(props) {
    super(props);
    this.pauseIcon = 'icon ion-md-pause';
    this.playIcon = 'icon ion-md-play';
    this.innerHTML = this.props.children;
  }

  render() {
    return (
      <span id={`song_${this.props.songIndex}`} className={this.props.icon}>{this.props.icon === undefined ? this.innerHTML : ''}</span>
    );
  }
}

export default SongControl;
