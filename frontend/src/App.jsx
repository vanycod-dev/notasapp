import { Route, Routes } from 'react-router'
import './App.css'
import Informacion from './componentes/Info'
import Layout from './pages/Layout'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Nota from './componentes/Nota'
import { AuthProvider } from './memoria/AuthContext'
import MisNotas from './componentes/MisNotas'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Informacion />} />
          <Route path='/informacion' element={<Informacion />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/nota' element={<Nota />} />
          <Route path='/misnotas' element={<MisNotas />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
