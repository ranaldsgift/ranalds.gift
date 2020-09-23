import React from 'react';
import './Background.css';
import BackgroundVideo from '../../assets/videos/backgrounds/home.mp4';
import BackgroundVideoPoster from '../../assets/videos/backgrounds/home-frame.png';

function Background() {
    return (
        <div className="fullscreen-background">
            <video style={{display: 'none'}} autoPlay={true} loop={true} poster={BackgroundVideoPoster} className="fullscreen-background-video">                
                <source src={BackgroundVideo} type="video/mp4"></source>
            </video>
            <div className="fullscreen-background-image"></div>
        </div>
    );    
}

export default Background;