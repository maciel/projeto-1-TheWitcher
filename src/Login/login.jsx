import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import fundo from './img/witcher_icon_by_slajter_d921uc9-fullview.png'
// import fundo from './img/planoFundocortado.png'
import logo from './img/logowitcher.png'
import axios from 'axios';


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useState(Number);
    const teste = parseInt(localStorage.getItem('id'));
    console.log('teste=>', teste)
    const fristString = localStorage.getItem('primeiraEntrada');
    const frist = new Date(fristString);

    const ano = frist.getFullYear();
    const mes = frist.getMonth() + 1;
    const dia = frist.getDate();
    const hora = frist.getHours();
    const minutos = frist.getMinutes();
    const segundos = frist.getSeconds()

    const segString = localStorage.getItem('ultimaSaida')
    const seg = new Date(segString);

    const ano2 = seg.getFullYear();
    const mes2 = seg.getMonth() + 1;
    const dia2 = seg.getDate();
    const hora2 = seg.getHours();
    const minutos2 = seg.getMinutes();
    const segundos2 = seg.getSeconds()
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])


    const navigate = useNavigate()


    const handleGetData = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/retorno/${userId}`
            );

            console.log(response.data);
            // Aqui, você pode processar os dados recebidos da rota GET como necessário
            const { primeiraEntrada, ultimaSaida } = response.data;

            // Exemplo de como você pode usar esses dados no seu componente
            console.log('Primeira Entrada:', primeiraEntrada);
            console.log('Ultima Saida:', ultimaSaida);
            localStorage.setItem('primeiraEntrada', primeiraEntrada)
            localStorage.setItem("ultimaSaida", ultimaSaida);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEntrada = async (userId) => {
        console.log('userId :>> ', userId);
        try {
            setAuthenticatedUser(userId);
            if (!userId) {
                console.error("Usuário não autenticado");
                return;
            }
            const response = await axios.post(
                `http://localhost:5000/entrada/${parseInt(userId)}`
            );

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSaida = async () => {
        console.log('Progresso ama o Maciel', teste)
        try {
            if (!teste) {
                console.error("Usuário não autenticado");
                return;
            }
            console.log('user ==> ', teste)
            const response = await axios.post(
                `http://localhost:5000/saida/${parseInt(teste)}`
            );

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/authController',
                JSON.stringify({ email, senha }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }

            );
            // console.log(response.data);
            setUser(true)
            // console.log(user)
            const token = response.data.token

            localStorage.setItem('authenticated', 'true')
            localStorage.setItem("token", `${token}`);
            localStorage.setItem('user', JSON.stringify(response.data.usuario))
            localStorage.setItem('id', response.data.usuario.id)
            const userId = response.data.usuario.id;

            console.log(`${token}`)
            console.log(localStorage.getItem('authenticated'))
            console.log(response.data.usuario.id)
            console.log("wdwdwdw=>", userId)

            console.log('dadwd', authenticatedUser)

            await handleEntrada(userId);
            await handleGetData(userId);

            navigate("/")

        } catch (error) {
            if (!error?.response) {
                setError("Erro ao acessar o servidor");
            } else if (error.response.status == 401) {
                setError("Usuário ou senha inválida")
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await handleSaida();
        setError('');
        localStorage.removeItem("token")
        localStorage.setItem("authenticated", 'false')
        localStorage.removeItem("user")
        localStorage.removeItem("id")
        localStorage.removeItem("ultimaSaida")
        localStorage.removeItem("primeiraEntrada")
        navigate("/")
    };

    return (

        <div className="login-container">

            <img src={fundo} alt="Minha Imagem" className="background-image" />
            <div className='login-border'>
                <div className="login-form">
                    {!user ? (
                        <div>
                            <img src={logo} alt="logo" className='img-logo' />
                            <h2 className='title'>Login</h2>
                            <p className='subtitle'>Seja bem-vindo a caçada</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <input className="input"
                                        type="text"
                                        id="username"
                                        value={email}
                                        placeholder='Digite seu email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-container">
                                    <input className='input'
                                        type="password"
                                        id="password"
                                        value={senha}
                                        placeholder='Digite sua senha'
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                                <div className='button-container'>
                                    <button className="custom-button" type="submit">Entrar</button>
                                </div>

                                <div>
                                    <p className='subtitle'>Não tem conta? <Link to="/register">Faça o cadastro</Link></p>
                                    <p className='subtitle'>{error}</p>
                                </div>

                                {/* <div>
                            <p>
                                Não tem conta? <Link to="/cadastro">Faça o cadastro</Link>
                            </p>
                        </div> */}
                            </form>
                        </div>
                    ) : (
                        <div>
                            <img src={logo} alt="logo" className='img-logo' />
                            <p className='subtitle'>Seja bem-vindo a caçada</p>
                            <h2>{user.nome}</h2>
                            <p>Primeira Entrada:</p>
                            <p>Data: {`${dia}/${mes}/${ano}`}</p>
                            <p>Hora: {`${hora}:${minutos}:${segundos}`}</p>
                            <p>Ultima Saida:</p>
                            <p>Data: {`${dia2}/${mes2}/${ano2}`}</p>
                            <p>Hora: {`${hora2}:${minutos2}:${segundos2}`}</p>
                            <div className='button-container'>
                                <button className="custom-button" type="submit" onClick={(e) => handleLogout(e)}>Logout</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default LoginScreen;