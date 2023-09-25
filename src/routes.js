import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import App from './pages/menu/App';
import Mapa from './pages/mapa/mapa';
import LoginScreen from './Login/login';
import Cadastro from './pages/cadastro/cadastro';
import Formulario from './formulário/formulario'
import Bestiario from './bestiario/bestiario'

function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/mapa" element={<Mapa/>}/>
                <Route path="/register" element={<Cadastro/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/formulario" element={<Formulario/>}/>
                <Route path="/bestiario" element={<Bestiario/>}/>

                

            </Routes>

        </Router>


    );
}

export default Rotas;