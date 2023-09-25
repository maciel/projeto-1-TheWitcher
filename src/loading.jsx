import React, { Component } from 'react';
import './App.css';

// Defina a matriz svgList aqui
const svgList = [
  {
    fillColor: 'red',
    pathData: 'M81.46,72,59.13,33.71,54.5,41.65,71,70H29L54.5,25.78l-1-1.79a4,4,0,0,0-6.91,0l-28,48A4,4,0,0,0,22,78H78a4,4,0,0,0,3.46-6Z',
    viewBox: '0 0 100 125',
  },
  {
    fillColor: 'purple',
    pathData: 'm864 252h-528l-27.48 59.281 186.84 220.8 155.04 183.24 135.96 160.68h-372.72l131.88-155.88-48.238-55.32-188.76 223.92 27.48 59.281h528l27.48-59.281-186.84-220.8-155.04-183.24-135.96-160.68h372.72l-132.24 155.52 45.598 52.32 2.6406 2.8789 5.6406-6.7188-1.0781 0.48047 184.56-217.2z',
    viewBox: '0 0 1500 1500',
  },
  {
    fillColor: 'blue',
    pathData: 'M81.46,72l-28-48a4,4,0,0,0-6.91,0L33.7,46H43l7-12.06L71,70H29l4.67-8H50V54H31.33a4,4,0,0,0-3.46,2L18.54,72A4,4,0,0,0,22,78H78a4,4,0,0,0,3.46-6Z',
    viewBox: '0 0 100 125',
  },
  {
    fillColor: 'yellow',
    pathData: 'M81.47,24A4,4,0,0,0,78,22H22a4,4,0,0,0-3.46,6l28,48a4,4,0,0,0,6.91,0L66.3,54H57L50,66.06,29,30H71l-4.67,8H50v8H71L81.46,28A4,4,0,0,0,81.47,24Z',
    viewBox: '0 0 100 125',
  },
  {
    fillColor: 'green',
    pathData: 'm936 276h-672c-8.4766 0.007812-16.68 3.0039-23.164 8.4648-6.4805 5.4609-10.832 13.031-12.277 21.383-1.4492 8.3516 0.09375 16.949 4.3633 24.273l336 576c6.4531 11.043 18.285 17.832 31.078 17.832s24.625-6.7891 31.078-17.832l276.6-474.12h-83.398l-224.28 384-273.36-468h630l10.441-17.879h-0.003906c4.2695-7.3242 5.8125-15.922 4.3633-24.273-1.4453-8.3516-5.7969-15.922-12.277-21.383-6.4844-5.4609-14.688-8.457-23.164-8.4648z',
    viewBox: '0 0 1500 1500',
  },
];

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSvgIndex: null,
    };
  }

  componentDidMount() {
    // Configurar um intervalo para alternar a seleção automaticamente a cada 2 segundos
    this.interval = setInterval(this.autoSelectNextSvg, 200);
  }

  componentWillUnmount() {
    // Limpar o intervalo quando o componente for desmontado
    clearInterval(this.interval);
  }

  autoSelectNextSvg = () => {
    const { selectedSvgIndex } = this.state;
    const svgListLength = svgList.length;

    // Calcular o próximo índice para seleção automática (circular)
    const nextIndex = selectedSvgIndex === null ? 0 : (selectedSvgIndex + 1) % svgListLength;

    this.setState({ selectedSvgIndex: nextIndex });
  };

  handleSvgClick = (index) => {
    this.setState({ selectedSvgIndex: index });
  };

  render() {
    const { selectedSvgIndex } = this.state;

    return (
      <div className="container">
        <div className="svg-container">
          {svgList.map((svg, index) => (
            <svg
              className={`svg-item ${selectedSvgIndex === index ? 'selected' : ''}`}
              width="150px"
              height="150px"
              viewBox={svg.viewBox}
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              fill={svg.fillColor}
              key={index}
              onClick={() => this.handleSvgClick(index)}
            >
              <path d={svg.pathData} />
            </svg>
          ))}
        </div>
      </div>
    );
  }
}

export default Loading;

