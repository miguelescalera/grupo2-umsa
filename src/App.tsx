import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {Login} from "./pages/Login";
import Register from './pages/Register';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Home/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
