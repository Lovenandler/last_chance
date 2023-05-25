import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function PlayerExample () {
    const[youtubeVideo, setYoutubeVideo] = useState('');
    const[youtubeUrl, setYoutubeUrl] = useState('https://youtu.be/SASZi1feEjE');
    const[youtubeError, setYoutubeError] = useState('');
    const handleYoutubeChange=(e)=>{
        setYoutubeVideo(e.target.value)
    }
    const handleYoutubeSubmit=(e)=>{
        e.preventDefault();
        const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
        if(youtubeRegex.test(youtubeVideo)){
            setYoutubeUrl(youtubeVideo);
        }else{
            setYoutubeError('Некорректная ссылка')
        }
    }
    return(
    <div>
        <form onSubmit={handleYoutubeSubmit}>
            <input type='text' placeholder='Вставь URL' onChange={handleYoutubeChange}></input>
            <Button type='submit'>Загрузить</Button>
        </form>
        {youtubeUrl && <div className='error_video_url'>{youtubeError}</div>}
        <div>            
            <ReactPlayer style={{width: '300px', height: '200px'}} url={youtubeUrl}></ReactPlayer>
        </div>
    </div>
  );

}
export default PlayerExample