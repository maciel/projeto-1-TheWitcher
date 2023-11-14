// Cadastro.js
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './cadastro.css'; // Importe o arquivo CSS
import fundo from '../../Login/img/FundoAni.gif'
import axios from 'axios';
function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState()


    const handleEntrada = async (userId) => {
        console.log('userId :>> ', userId);
        try {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/cadastro', {
                nome,
                email,
                senha,
            });
            alert('Usuário cadastrado com sucesso!');
            console.log(response.data);
            setUser(true)
            console.log(user)
            const token = response.data.token
            
            localStorage.setItem('authenticated', 'true')
            localStorage.setItem("token", `${token}`);
            localStorage.setItem('user', JSON.stringify(response.data.usuario))
            const userId = response.data.usuario.id;

            console.log(`${token}`)
            console.log(localStorage.getItem('authenticated'))
            
            await handleEntrada(userId);
            await handleGetData(userId);
            // console.log(response.data.usuario.id)
            navigate("/")
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário.');
        }

    }

        return(
            <div>
                <div className="cadastro-container">
                    <img src={fundo} alt="Minha Imagem" className="cadastro-background-image" />
                    <div className='cadastro-border' >
                        <div className='cadastro-form'>
                            <h2 className='cadastro-title'>Cadastro</h2>
                            <p className='cadastro-subtitle'>Seja bem-vindo a caçada</p>
                            <form onSubmit={handleSubmit}>
                                <div className='cadastro-input'>
                                    <label className='cadastro-subtitle' htmlFor="nome">Nome:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className='cadastro-input'>
                                    <label className='cadastro-subtitle' htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='cadastro-input'>
                                    <label className='cadastro-subtitle' htmlFor="senha">Senha:</label>
                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                                <div className='cadastro-container-button'>
                                    <button className='cadastro-button-custom' type="submit">Cadastrar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>



        );
}
export default Cadastro; 