import React from 'react'

class AudioPlayer extends React.Component {
  render() {
    return (
      <div>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/rain.mp3?alt=media&token=ebdde4c1-f9fc-4855-ada4-a44d63883f35" controls/>
      </div>
    );
  }
}

export default AudioPlayer;