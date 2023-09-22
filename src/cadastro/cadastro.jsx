// Cadastro.js

import React, { Component } from 'react';
import './cadastro.css'; // Importe o arquivo CSS
import fundo from '../Login/img/FundoAni.gif'
class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: '',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar o formulário para o servidor ou realizar ações necessárias
    };

    render() {
        return (
            <div>
                <div className="cadastro-container">
                    <img src={fundo} alt="Minha Imagem" className="cadastro-background-image" />
                    <div className='cadastro-border' >
                        <div className='cadastro-form'>
                            <h2 className='cadastro-title'>Cadastro</h2>
                            <p className='cadastro-subtitle'>Seja bem-vindo a caçada</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className='cadastro-input'>
                                    <label className='cadastro-subtitle' htmlFor="nome">Nome:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={this.state.nome}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='cadastro-input'>
                                    <label className='cadastro-subtitle' htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='cadastro-input'>
                                    <label className='cadastro-subtitle' htmlFor="senha">Senha:</label>
                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        value={this.state.senha}
                                        onChange={this.handleChange}
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
}

export default Cadastro;
