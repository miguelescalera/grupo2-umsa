import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {Login} from "./pages/Login";
import Register from './pages/Register';
import { Home } from './pages/Home';
import TurnoMedico from './pages/TurnoMedico';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Home/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/turnomedico' element={<TurnoMedico/>}/>
      </Routes>
    </div>
  );
}

export default App;
