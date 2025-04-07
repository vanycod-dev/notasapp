import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './pages/Layout.jsx';
import Info from './componentes/Info.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Notas from './componentes/Notas.jsx';
import Lista from './componentes/Lista.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Info/>} />
          <Route path="/login" element={ <Login /> } />
          <Route path="/registro" element={<Registro />} />
          <Route path="/lista" element={<Lista />} />
          {/* <Route path="note/:id" element={<Modal> <Notas></Notas> </Modal>} /> */}
          <Route path="/notas" element={<Notas/>} />
          <Route path="/info" element={<Info/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
