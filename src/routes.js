import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import App from './App';
import Mapa from './mapa/mapa';

function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/mapa" element={<Mapa/>}/>
                

            </Routes>

        </Router>


    );
}

export default Rotas;