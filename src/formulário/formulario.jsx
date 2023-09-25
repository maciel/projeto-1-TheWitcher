import React from 'react';
import './formulario.css';
import fundo from "./img/fundo_formulário.jpg"
const Formulario = () => {
  return (
    
    <div className="formulario-container">
        <img src={fundo} alt="Minha Imagem" className="cadastro-background-image" />
      <div className="campo">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" />
      </div>

      <div className="campo">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>

      <div className="campo">
        <label htmlFor="opiniao">Opinião do Site:</label>
        <textarea id="opiniao" name="opiniao" rows="5"></textarea>
      </div>

      <button type="submit" className="botao-centralizado">Enviar</button>
    </div>
  );
};

export default Formulario;
