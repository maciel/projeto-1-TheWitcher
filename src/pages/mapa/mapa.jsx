import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './mapa.css';
import Player from "../../components/player/player";
import musicaDeFundo from '../../sounds/soundtrack.mp3';
import quest from '../../sounds/newquest.wav'
import { Howl} from 'howler';
import { Navigate } from "react-router-dom";
function Mapa() {
    const [audioStarted, setAudioStarted] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const navigate = useNavigate()

    const startAudio = () => {
        if (!audioStarted) {
            const audioMusicaFundo = new Audio(musicaDeFundo);
            audioMusicaFundo.loop = true;
            audioMusicaFundo.play();
            setAudioStarted(true);
            setShowPlayer(true);
        }
        clickSound.play(); 
    };
    const clickSound = new Howl({
        src: quest, 
      });
      useEffect(() => {
        if (localStorage.getItem('authenticated') != "true") navigate('/login');
    }, [])

    return (
        <div className="mapaContainer">


            <div>

            </div>
            {showPlayer && <Player />}
            {!audioStarted && (
                <button className="centerButton" onClick={startAudio} >
                    Iniciar Caçada !
                </button>
            )}
        </div>
    );
}

export default Mapa;
