import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import Register from '../pages/Register'
import Perfil from '../pages/Perfil'
import TurnoMedico from '../pages/TurnoMedico'

const RouterPages = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Home/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/turnoMedico' element={<TurnoMedico/>}/>
    </Routes>
  )
}

export default RouterPages