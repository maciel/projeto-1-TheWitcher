import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginScreen from './Login/login';
import reportWebVitals from './reportWebVitals';
import Cadastro from './cadastro/cadastro';
import Bestiario from './bestiario/bestiario';
import Formulario from './formulário/formulario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Cadastro/>   */}
    {/* <LoginScreen/> */}
    {/* <Bestiario/> */}
    <Formulario/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
