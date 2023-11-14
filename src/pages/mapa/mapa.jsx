import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './mapa.css';
import Player from "../../components/player/player";
import musicaDeFundo from '../../sounds/soundtrack.mp3';
import quest from '../../sounds/newquest.wav';
import { Howl } from 'howler';

const monsterImages = require.context('../../image/monsters', false, /\.(png|jpe?g|svg)$/);
const monsterImagePaths = monsterImages.keys().map(monsterImages);
const initialNumMonsters = 2;
const Mapa = () => {
    const [audioStarted, setAudioStarted] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [playerLevel, setPlayerLevel] = useState(0);
    const [defeatedMonsters, setDefeatedMonsters] = useState([]);
    const [isDaytime, setIsDaytime] = useState(true); // Estado para verificar se é de dia ou de noite

    const navigate = useNavigate();
    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();

        // Se a hora estiver entre 6 e 18, é considerado dia
        const isDay = currentHour >= 6 && currentHour < 18;
        setIsDaytime(isDay);
    }, []);
    useEffect(() => {
        if (localStorage.getItem('authenticated') !== "true") navigate('/login');
    }, [navigate]);

    useEffect(() => {
        // Ajuste o número inicial de monstros conforme necessário
        const initialNumMonsters = 10; // Por exemplo, 10 monstros iniciais
        placeItems(initialNumMonsters);
    }, []);
    
    const startAudio = () => {
        if (!audioStarted) {
            const audioMusicaFundo = new Audio(musicaDeFundo);
            audioMusicaFundo.loop = true;
            audioMusicaFundo.play();
            setAudioStarted(true);
            setShowPlayer(true);
        }
    };

    const clickSound = new Howl({
        src: quest,
    });

    const generateRandomPosition = () => {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        return { x, y };
    };

    const generateRandomLevelGain = () => {
        return Math.floor(Math.random() * 5) + 1;
    };

    const placeItems = (numImages) => {
        const newItems = Array.from({ length: numImages }, (_, index) => {
            const position = generateRandomPosition();
            const imageIndex = index % monsterImagePaths.length;
            return {
                id: index,
                position,
                image: monsterImagePaths[imageIndex],
            };
        });
        setItems(newItems);
    };
   
    useEffect(() => {
        
        if (playerLevel >= 5 && playerLevel <= 9 ) {
            const numImages = 5 + initialNumMonsters;
            placeItems(numImages);
        }
        if (playerLevel >= 10 && playerLevel <= 14 ) {
            const numImages = 10 + initialNumMonsters;
            placeItems(numImages);
        }
        if (playerLevel >= 15 && playerLevel <= 19 ) {
            const numImages = 15 + initialNumMonsters;
            placeItems(numImages);
        }
        if (playerLevel >= 20 && playerLevel <= 24 ) {
            const numImages = 20 + initialNumMonsters;
            placeItems(numImages);
        }
        if (playerLevel >= 25 && playerLevel <= 29 ) {
            const numImages = 25 + initialNumMonsters;
            placeItems(numImages);
        }
        if (playerLevel >= 30 && playerLevel <= 29 ) {
            const numImages = 30 + initialNumMonsters;
            placeItems(numImages);
        }
    }, [playerLevel]);
    useEffect(() => {
       
        placeItems(initialNumMonsters);
       
    }, []);
    useEffect(() => {
        if (playerLevel >= 30) {
            if (isDaytime) {
                document.body.classList.add('nivel-30-dia');
                document.body.classList.remove('nivel-30-noite');
            } else {
                document.body.classList.add('nivel-30-noite');
                document.body.classList.remove('nivel-30-dia');
            }
        } else {
            document.body.classList.remove('nivel-30-dia', 'nivel-30-noite');
        }
    }, [playerLevel, isDaytime]);

    const [visibleMapFraction, setVisibleMapFraction] = useState(0.25);

    useEffect(() => {
        if (playerLevel >= 40) {
            setVisibleMapFraction(1);
        } else if (playerLevel >= 30) {
            setVisibleMapFraction(0.75);
        } else if (playerLevel >= 15) {
            setVisibleMapFraction(0.5);
            document.body.classList.add('nivel-15');
        } else {
            setVisibleMapFraction(0.25);
        }

        return () => {
            document.body.classList.remove('nivel-15');
        };
    }, [playerLevel]);

    const handleItemPickup = (itemId) => {
        const selected = items.find((item) => item.id === itemId);
        const monsterName = selected.image.split('/').pop().split('.')[0];
        const levelGain = generateRandomLevelGain();

        setSelectedMonster({ id: itemId, name: monsterName, levelGain });
        setShowModal(true);
        console.log(`Item ${itemId} foi pego!`);
    };

    const handleMonsterEncounter = () => {
        setPlayerLevel((prevLevel) => prevLevel + selectedMonster.levelGain);
        setDefeatedMonsters((prevMonsters) => [...prevMonsters, selectedMonster]);
        setItems((prevItems) => prevItems.filter((item) => item.id !== selectedMonster.id));
        setShowModal(false);
        // Lógica adicional relacionada ao encontro com o monstro
    };

    return (
        <div className="mapaContainer">
            <div>
                <p>Nível Atual: {playerLevel}</p>
                {items
                    .filter((item) => !defeatedMonsters.find((monster) => monster.id === item.id))
                    .map((item) => (
                        <button
                            key={item.id}
                            style={{
                                position: 'absolute',
                                top: item.position.y,
                                left: item.position.x,
                                visibility: 'visible',
                                border: 'none',
                                background: 'none',
                                padding: 0,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleItemPickup(item.id)}
                        >
                            <img
                                src={item.image}
                                alt="Monstro"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                        </button>
                    ))}

                {showModal && selectedMonster && (
                    <div className="modal">
                        <p>{`Enfrente o monstro: ${selectedMonster.name}`}</p>
                        <p>{`Ganho de Nível: +${selectedMonster.levelGain}`}</p>
                        <button onClick={handleMonsterEncounter}>
                            Enfrentar
                        </button>
                    </div>
                )}
            </div>

            {showPlayer && <Player setPlayerPosition={setPlayerPosition} />}
            {!audioStarted && (
                <button className="centerButton" onClick={startAudio}>
                    Iniciar Caçada!
                </button>
            )}
        </div>
    );
}

export default Mapa;
