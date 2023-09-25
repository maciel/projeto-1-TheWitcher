import React, { useState,useEffect,useRef } from 'react';
import './bestiario.css';
import urso from "./img/bear.png";
import fundo from "./img/upscale.png"
import Chevron from './chevron.svg'

function Bestiario() {
    
    const [toggle, setToggle] = useState(false)
    const [heightEl, setHeightEl] = useState();

    const refHeight = useRef()

    useEffect(() => {
        console.log(refHeight);
        setHeightEl(`${refHeight.current.scrollHeight}px`)
    }, [])

    const toggleState = () => {
        setToggle(!toggle)
    }

    console.log(toggle);
    return (
        <div className='bestiario-container'>
            <header>
                <div class="left-content">
                    Número de Monstros: 100
                </div>
                <h1>Bestiário</h1>
                <div class="right-content">
                   Level: 50
                </div>
            </header>
        <section className='container'>
            <img src={fundo} alt="Minha Imagem" className="cadastro-background-image" />
            <div className='div-esquerda'>
                <div className='accordion'>
                    <button onClick={toggleState} className='accordion-visible'>
                        <span>Personagens</span>
                        <img className={toggle && "active"} src={Chevron} />
                    </button>
                    <div className={toggle ? 'accordion-toggle animated':'accordion-toggle'} style={{height: toggle ? `${heightEl}` : "0px"}}
                    ref={refHeight}>
                        <p>
                            SubItens
                        </p>
                    </div>
                    <button onClick={toggleState} className='accordion-visible'>
                        <span>Monstros</span>
                        <img className={toggle && "active"} src={Chevron} />
                    </button>
                    <div className={toggle ? 'accordion-toggle animated':'accordion-toggle'} style={{height: toggle ? `${heightEl}` : "0px"}}
                    ref={refHeight}>
                        <p>
                            Subitens
                        </p>
                    </div>
                    <button onClick={toggleState} className='accordion-visible'>
                        <span>Armas</span>
                        <img className={toggle && "active"} src={Chevron} />
                    </button>
                    <div className={toggle ? 'accordion-toggle animated':'accordion-toggle'} style={{height: toggle ? `${heightEl}` : "0px"}}
                    ref={refHeight}>
                        <p>
                            Subitens
                        </p>
                    </div>
                </div>
            </div>
            <div className='div-meio'>
                <img src={urso}/>
            </div>
            <div className='div-direita'>
                <p>
                    Os ursos são animais robustos com pernas curtas e garras poderosas. Eles fazem parte da fauna natural do mundo, o que indica que não chegaram ao Continente através da Conjunção das Esferas.
                </p>
                <p>Sendo mamíferos onívoros, os ursos têm uma dieta variada, incluindo vegetação, outros animais selvagens e, ocasionalmente, até seres humanos. Quando buscam alimento entre os seres humanos, preferem abordar viajantes que inadvertidamente invadiram seu território ou caçadores intrépidos que decidiram desafiá-los.
                </p>
            </div>
        </section>
        </div>
    );
}

export default Bestiario;
