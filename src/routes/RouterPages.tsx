import { Route, Routes, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import Register from '../pages/Register'
import Perfil from '../pages/Perfil'
import TurnoMedico from '../pages/TurnoMedico'
import { useAppContext } from '../Context/Context'

const RouterPages = () => {
  const { isAuthenticated } = useAppContext()

  return (
    <Routes>
      <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
      <Route path='*' element={<Home />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/perfil' element={isAuthenticated ? <Perfil /> : <Navigate to="/signin" />} />
      <Route path='/turnoMedico' element={isAuthenticated ? <TurnoMedico /> : <Navigate to="/signin" />} />
    </Routes>
  )
}

export default RouterPages