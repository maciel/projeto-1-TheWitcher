
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import fundo from './img/witcher_icon_by_slajter_d921uc9-fullview.png'
// import fundo from './img/planoFundocortado.png'
import logo from './img/logowitcher.png'
function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione aqui a lógica de autenticação (por exemplo, verificar o username e a senha)
        // Você pode usar um estado ou fazer uma chamada à API para autenticar o usuário.

        // Exemplo de impressão dos valores no console:
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (

        <div className="login-container">
             <img src={fundo} alt="Minha Imagem" className="background-image" /> 
            <div className='login-border'>
                <div className="login-form">
                    <img src={logo} alt="logo" className='img-logo' />
                    <h2 className='title'>Login</h2>
                    <p className='subtitle'>Seja bem-vindo a caçada</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input className="input"
                                type="text"
                                id="username"
                                value={username}
                                placeholder='Digite seu email'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input className='input'
                                type="password"
                                id="password"
                                value={password}
                                placeholder='Digite sua senha'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='button-container'>
                            <button className="custom-button" type="submit">Entrar</button>
                        </div>

                        <div>
                            <p className='subtitle'>Não tem conta ? Faça seu cadastro</p>
                        </div>
                        {/* <div>
                            <p>
                                Não tem conta? <Link to="/cadastro">Faça o cadastro</Link>
                            </p>
                        </div> */}
                    </form>
                </div>
            </div>

        </div>
    );
}

export default LoginScreen;
