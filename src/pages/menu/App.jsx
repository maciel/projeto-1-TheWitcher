import './menu.css';
import backgroundVideo from '../../assets/menu.mp4';
import menuLogo from '../../assets/menuLogo.png';
import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import audio from '../../sounds/selecionar.mp3'
import pressionar from '../../sounds/pressionar.wav'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const log = localStorage.getItem('authenticated');
  console.log(log); // Ensure you are using the correct variable name 'user' instead of 'log'

  const sound = new Howl({
    src: audio,
    mute: isMuted,
  });

  useEffect(() => {
    return () => {
      sound.unload();
    };
  }, [isMuted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.play();
  };

  const clickSound = new Howl({
    src: pressionar,
    mute: isMuted,
  });

  const toMap = () => {
    clickSound.play();
    navigate("/mapa");
  };

  const toLogin = () => {
    clickSound.play();
    navigate("/login");
  };

  const toRegister = () => {
    clickSound.play();
    navigate("/register");
  };

  const toBestiario = () => {
    clickSound.play();
    navigate("/bestiario");
  };

  const toFeedback = () => {
    clickSound.play();
    navigate("/formulario");
  };

  return (
    <>
      {log == 'false'? (
        <div className='container'>
          <video autoPlay loop muted={isMuted} className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className='aba'>
            <div className='logo-container'>
              <img alt='logo' width='90%' height='150vh' src={menuLogo}></img>
            </div>
            <div className='selecionaveis'>
              <div className="textos">
                <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toLogin}>Login</button>
              </div>
              <div className="textos">
                <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toRegister}>Registrar</button>
              </div>
            </div>
            <div className='mute-button'>
              <button onClick={() => setIsMuted(!isMuted)} className="mute-button">
                {isMuted ? 'Ativar Som' : 'Mutar Som e Vídeo'}
              </button>
            </div>
          </div>
        </div>
      ) : <div className='container'>
      <video autoPlay loop muted={isMuted} className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className='aba'>
        <div className='logo-container'>
          <img alt='logo' width='90%' height='150vh' src={menuLogo}></img>
        </div>
        <div className='selecionaveis'>
          <div className="textos">
            <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toLogin}>Logout</button>
          </div>
          <div className="textos">
            <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toMap}>Mapa</button>
          </div>
          <div className="textos">
            <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toBestiario}>Bestiário</button>
          </div>
          <div className="textos">
            <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toFeedback}>Feedback</button>
          </div>
        </div>
        <div className='mute-button'>
          <button onClick={() => setIsMuted(!isMuted)} className="mute-button">
            {isMuted ? 'Ativar Som' : 'Mutar Som e Vídeo'}
          </button>
        </div>
      </div>
    </div>}
    </>
  );
}

export default App;
