import React, { useState } from "react";
import './mapa.css';
import Player from "../../components/player/player";
import musicaDeFundo from '../../sounds/soundtrack.mp3';
import quest from '../../sounds/newquest.wav'
import { Howl} from 'howler';

function Mapa() {
    const [audioStarted, setAudioStarted] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    const startAudio = () => {
        if (!audioStarted) {
            const audioMusicaFundo = new Audio(musicaDeFundo);
            audioMusicaFundo.loop = true;
            audioMusicaFundo.play();
            setAudioStarted(true);
            setShowPlayer(true);
        }
        clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
    };
    const clickSound = new Howl({
        src: quest, // Substitua pelo caminho do seu outro arquivo de áudio
      });
     
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
