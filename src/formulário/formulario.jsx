
import './formulario.css';
import fundo from "./img/fundo_formulário.jpg"
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Formulario = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState(String)
  const [email, setEmail] = useState(String)
  const [opiniao, setOpiniao] = useState(String)

  async function Envio() {
  

    try {
     
        
        if (nome && email && opiniao) {
            const response = await axios.post('http://localhost:5000/formulario', {
                "nome": nome,
                "email": email,
                "opiniao": opiniao

            }).catch(err =>  alert(err.response.data));
            if (response) {
                alert("Opinião Registrada com Sucesso !!")
                navigate("/");
            }

        } else alert('Preencha todos os campos!!')

    } catch (err) {
        if(err?.response?.data)
        alert(err.response.data)
        else alert(err.menssage)
    }






}

  useEffect(() => {
    if (localStorage.getItem('authenticated') != "true") navigate('/login');
   
}, [])

  return (
    
    <div className="formulario-container">
        <img src={fundo} alt="Minha Imagem" className="cadastro-background-image" />
      <div className="campo">
        <label htmlFor="nome" >Nome:</label>
        <input type="text" id="nome" name="nome"  onChange={(event => setNome(event.target.value))}/>
      </div>

      <div className="campo">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(event => setEmail(event.target.value))} />
      </div>

      <div className="campo">
        <label htmlFor="opiniao">Opinião do Site:</label>
        <textarea id="opiniao" name="opiniao" rows="5" onChange={(event) => setOpiniao(event.target.value)}></textarea>
      </div>

      <button type="submit" className="botao-centralizado" onClick={() => Envio()} >Enviar</button>
    </div>
  );
};

export default Formulario;
