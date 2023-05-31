import React from 'react'
import './AudioPlayer.css'
class AudioPlayer extends React.Component {
  render() {
    return (
      <div>
        <p>Дождь</p>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/rain.mp3?alt=media&token=ebdde4c1-f9fc-4855-ada4-a44d63883f35" controls/>
        <p>Кот</p>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/cat.mp3?alt=media&token=fa540539-67e5-435a-9548-95d9b2c7ebd0" controls/>
        <p>Библиотека</p>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/library.mp3?alt=media&token=99ceb87f-aaa7-4740-9c70-b58e1e6e828c" controls/>
        <p>Полночь летом</p>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/midnight%20in%20summer.mp3?alt=media&token=dbf4a3c9-fb4c-4f4e-b932-babc353d2d54" controls/>
        <p>Люди</p>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/people.mp3?alt=media&token=bf1bc600-b334-4cad-9d5d-77c74cc1733e" controls/>
        <p>Винил</p>
        <audio ref="audio_tag" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/vinil.mp3?alt=media&token=6283e087-bd1f-4789-8498-69b78a1532f8" controls/>
      </div>
    );
  }
}

export default AudioPlayer;