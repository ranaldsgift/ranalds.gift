import React from 'react';
import './Background.css';
import BackgroundVideo from '../../assets/videos/backgrounds/home.mp4';
import BackgroundVideoPoster from '../../assets/videos/backgrounds/home-frame.jpg';

function Background(props) {
    if (props.hideVideo) {    
        return (
            <div className="fullscreen-background">
                <div className="fullscreen-background-image"></div>
                <div className="background-toggle" onClick={props.toggleBackground} title="Toggle Background Video"></div>
                <a href="/about" className="rg-icon main-logo">&nbsp;</a>
            </div>
        );
    }

    return (
        <div className="fullscreen-background">
            <div className="fullscreen-background-image"></div>
            <video muted playsInline autoPlay={true} loop={true} poster={BackgroundVideoPoster} className="fullscreen-background-video">                
                <source src={BackgroundVideo} type="video/mp4"></source>
            </video>
            <div className="background-toggle" onClick={props.toggleBackground} title="Toggle Background Video"></div>
            <a href="/about" className="rg-icon main-logo">&nbsp;</a>
        </div>
    );    
}

export default Background;