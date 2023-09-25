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
  const [isMuted, setIsMuted] = useState(false); // Estado para controlar o mudo

  const sound = new Howl({
    src: audio,
    mute: isMuted, // Use o estado para definir se o som está mudo ou não
  });

  useEffect(() => {
    // Certifique-se de limpar o som ao desmontar o componente
    return () => {
      sound.unload();
    };
  }, [isMuted]); // Dependência do estado de mudo

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.play(); // Inicia a reprodução do som
  };

  const clickSound = new Howl({
    src: pressionar,
    mute: isMuted, // Use o estado para definir se o som está mudo ou não
  });

  const toMap = () => {
    clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
    // Adicione qualquer lógica adicional aqui, se necessário
    navigate("/mapa");
  };

  const toLogin = () => {
    clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
    // Adicione qualquer lógica adicional aqui, se necessário
    navigate("/login");
  };

  const toRegister = () => {
    clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
    // Adicione qualquer lógica adicional aqui, se necessário
    navigate("/register");
  };

  const toBestiario = () => {
    clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
    // Adicione qualquer lógica adicional aqui, se necessário
    navigate("/bestiario");
  };
  const toFeedback = () => {
    clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
    // Adicione qualquer lógica adicional aqui, se necessário
    navigate("/formulario");
  };

  return (
    <>
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
              <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toMap}>Mapa</button>
            </div>
            <div className="textos">
              <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toBestiario}>Bestiário</button>
            </div>
            <div className="textos">
              <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toRegister}>Registrar</button>
            </div>
            <div className="textos">
              <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onClick={toFeedback}>Feedback</button>
            </div>
            
          </div>
          <div className='mute-button'>
            <button onClick={() => setIsMuted(!isMuted)} className="mute-button">
              {isMuted ? 'Ativar Som' : 'Mutar Som e Vídeo'} {/* Texto do botão baseado no estado de mudo */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
