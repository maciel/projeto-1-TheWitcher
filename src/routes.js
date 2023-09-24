import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import App from './pages/menu/App';
import Mapa from './pages/mapa/mapa';
import LoginScreen from './Login/login';
import Cadastro from './pages/cadastro/cadastro';

function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/mapa" element={<Mapa/>}/>
                <Route path="/register" element={<Cadastro/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                

            </Routes>

        </Router>


    );
}

export default Rotas;