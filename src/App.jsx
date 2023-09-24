
import './menu.css';
import backgroundVideo from './assets/menu.mp4';
import menuLogo from './assets/menuLogo.png';
import React, { useState } from 'react';
import { Howl, Howler } from 'howler';
import audio from './sounds/selecionar.mp3'
import pressionar from './sounds/pressionar.wav'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const sound = new Howl({
    src: audio})
    const handleMouseEnter = () => {
      setIsHovered(true);
      sound.play(); // Inicia a reprodução do som
    };
    const clickSound = new Howl({
      src: pressionar, // Substitua pelo caminho do seu outro arquivo de áudio
    });
    const handleButtonClick = () => {
      clickSound.play(); // Inicia a reprodução do som quando o botão é clicado
      // Adicione qualquer lógica adicional aqui, se necessário
      navigate("/mapa");
    };
    
    
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      sound.stop(); // Interrompe a reprodução do som
    };

    return (
      <>
        <div className='container'>
        <video autoPlay loop className="background-video">
            <source src={backgroundVideo} type="video/mp4" />

          </video>
          <div className='aba'>
            <div className='logo-container'>
              <img alt='logo' width='90%' height='150vh' src={menuLogo}></img>
            </div>
            <div className='selecionaveis'>
              <div className="textos">
                <button  className="botao-personalizado" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonClick} >Login</button>
              </div>
              <div className="textos">
                <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonClick}>Mapa</button>
              </div>
              <div className="textos">
                <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonClick}>Bestiário</button>
              </div>
              <div className="textos">
                <button className="botao-personalizado" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonClick}>Criadores</button>
              </div>
            </div>



          </div>
        </div>
      </>
    );
  }

  export default App;
