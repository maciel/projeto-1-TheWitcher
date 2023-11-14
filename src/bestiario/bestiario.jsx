import React, { useState, useEffect, useRef } from 'react';
import './bestiario.css';
import urso from "./img/bear.png";
import fundo from "./img/upscale.png"
import Chevron from './chevron.svg';
import { useNavigate } from 'react-router-dom';



function Bestiario() {
    const [toggle, setToggle] = useState(false);
    const [toggledois, setToggledois] = useState(false);
    const [toggletres, setToggletres] = useState(false);
    const [heightEl, setHeightEl] = useState();
    const [selectedMonster, setSelectedMonster] = useState('');
    const navigate = useNavigate();

    const refHeight = useRef();

    useEffect(() => {
        setHeightEl(`${refHeight.current.scrollHeight}px`);
        if (localStorage.getItem('authenticated') !== "true") navigate('/login');
    }, []);

    const toggleState = () => {
        setToggle(!toggle);
    };

    const toggleStatedois = () => {
        setToggledois(!toggledois);
        setSelectedMonster(null);
    };

    const toggleStatetres = () => {
        setToggletres(!toggletres);
    };

    const monsterImages = require.context('../image/monsters', false, /\.(png|jpe?g|svg)$/);
    const monsterImagePaths = monsterImages.keys().map(monsterImages);
    const persoImages = require.context('../image/character', false, /\.(png|jpe?g|svg)$/);
    const persoImagePaths = persoImages.keys().map(persoImages);

    return (
        <div className='bestiario-container'>
            <header>
                <div className="left-content">
                    The Witcher
                </div>
                <h1>Bestiário</h1>
                <div className="right-content">
                    2023
                </div>
            </header>
            <section className='containers'>
                <img src={fundo} alt="Minha Imagem" className="cadastro-background-image" />
                <div className='div-esquerda'>
                    <div className='accordion'>
                        <button onClick={toggleState} className='accordion-visible'>
                            <span>Personagens</span>
                            <img className={toggle && "active"} src={Chevron} alt="Chevron" />
                        </button>
                        <div className={toggle ? 'accordion-toggle animated' : 'accordion-toggle'} style={{ height: toggle ? `${heightEl}` : "0px" }}
                            ref={refHeight}>
                            {/* Lista de nomes de monstros como botões */}
                            {toggle && (
                                <div className="accordion-toggle-buttons">
                                    {persoImagePaths.map((imagePath, index) => {
                                        const fileName = imagePath.split('/').pop();
                                        const subItemName = fileName.split('.')[0];

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedMonster(imagePath)}
                                                className={selectedMonster === subItemName ? 'active' : ''}
                                                style={{ display: 'block', marginBottom: '10px' }} // Adicionado estilo para exibir em coluna
                                            >
                                                {subItemName}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <button onClick={toggleStatedois} className='accordion-visible'>
                            <span>Monstros</span>
                            <img className={toggledois && "active"} src={Chevron} alt="Chevron" />
                        </button>
                        <div className={toggledois ? 'accordion-toggle animated' : 'accordion-toggle'} style={{ height: toggledois ? `${heightEl}` : "0px" }}
                            ref={refHeight}>
                            {/* Lista de nomes de monstros como botões */}
                            {toggledois && (
                                <div className="accordion-toggle-buttons">
                                    {monsterImagePaths.map((imagePath, index) => {
                                        const fileName = imagePath.split('/').pop();
                                        const subItemName = fileName.split('.')[0];

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedMonster(imagePath)}
                                                className={selectedMonster === subItemName ? 'active' : ''}
                                                style={{ display: 'block', marginBottom: '10px' }} // Adicionado estilo para exibir em coluna
                                            >
                                                {subItemName}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                      
                        <div className={toggletres ? 'accordion-toggle animated' : 'accordion-toggle'} style={{ height: toggletres ? `${heightEl}` : "0px" }}
                            ref={refHeight}>
                            <p>
                                Subitens
                            </p>
                        </div>
                    </div>
                </div>
                <div className='div-meio'>
                    {selectedMonster && (
                        <img
                            src={selectedMonster}
                            alt={'monster'}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </div>
                <div className='div-meio'>
                    {selectedMonster && (
                        <p>{selectedMonster.split('/').pop().split('.')[0]}</p>
                    )}
                </div>


            </section>
        </div>
    );
}

export default Bestiario;
