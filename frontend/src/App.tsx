import { Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
