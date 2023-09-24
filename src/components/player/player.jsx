import React, { Component } from 'react';
import somDeMovimento from '../../sounds/riding.wav'; // Importe o som de movimento específico aqui
import somInicial from '../../sounds/isso_ai_carpeado.mp3'; // Importe o som inicial aqui
import boneco from '../../assets/boneco.png';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerX: 0,
      playerY: 0,
      xDirection: 0,
      yDirection: 0,
      isMoving: false,
      hasStarted: false,
    };
    this.step = 3;
    this.audioMovimento = new Audio(somDeMovimento);
    this.audioMovimento.loop = true;
    this.audioInicial = new Audio(somInicial);
    this.windowWidth = window.innerWidth; // Largura da janela do navegador
    this.windowHeight = window.innerHeight; // Altura da janela do navegador
    this.playerWidth = 50; // Largura do personagem (ajuste conforme necessário)
    this.playerHeight = 100; // Altura do personagem (ajuste conforme necessário)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    requestAnimationFrame(this.updatePosition);
    this.audioInicial.play();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (event) => {
    const { key } = event;
    this.setState((prevState) => {
      let { xDirection, yDirection, isMoving, hasStarted } = prevState;

      switch (key) {
        case 'ArrowUp':
          yDirection = -1;
          break;
        case 'ArrowDown':
          yDirection = 1;
          break;
        case 'ArrowLeft':
          xDirection = -1;
          break;
        case 'ArrowRight':
          xDirection = 1;
          break;
        default:
          break;
      }

      if (!hasStarted) {
        this.audioInicial.play();
        this.setState({ hasStarted: true });
      }

      if (!isMoving) {
        this.audioMovimento.play();
        this.setState({ isMoving: true });
      }

      return { xDirection, yDirection };
    });
  };

  handleKeyUp = (event) => {
    const { key } = event;
    this.setState((prevState) => {
      let { xDirection, yDirection } = prevState;

      switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
          yDirection = 0;
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          xDirection = 0;
          break;
        default:
          break;
      }

      const isMoving = xDirection !== 0 || yDirection !== 0;

      if (!isMoving) {
        this.audioMovimento.pause();
        this.audioMovimento.currentTime = 0;
        this.setState({ isMoving: false });
      }

      return { xDirection, yDirection };
    });
  };

  updatePosition = () => {
    this.setState((prevState) => {
      const { playerX, playerY, xDirection, yDirection } = prevState;

      const minX = 0;
      const maxX = this.windowWidth - this.playerWidth; // Subtrai a largura do personagem
      const minY = 0;
      const maxY = this.windowHeight - this.playerHeight; // Substitua playerHeight pelo valor correto

      let newPlayerX = playerX + xDirection * this.step;
      let newPlayerY = playerY + yDirection * this.step;

      newPlayerX = Math.min(Math.max(newPlayerX, minX), maxX);
      newPlayerY = Math.min(Math.max(newPlayerY, minY), maxY);

      return {
        playerX: newPlayerX,
        playerY: newPlayerY,
      };
    });

    requestAnimationFrame(this.updatePosition);
  };

  render() {
    const { playerX, playerY } = this.state;

    return (
      <img
        src={boneco}
        alt="Personagem"
        style={{
          position: 'absolute',
          width: '13%',
          height: '20vh',
          left: `${playerX}px`,
          top: `${playerY}px`,
        }}
      />
    );
  }
}

export default Player;
