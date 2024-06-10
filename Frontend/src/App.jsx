import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Nav from './components/Nav/Nav'
import Register from './components/Login/Register'
import Error from './components/Error/Error'
import { Logout } from './components/Login/Logout'
import { useAuth } from './components/auth/auth'

function App() {

  const {isLoggedIn} = useAuth();

  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Login/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
