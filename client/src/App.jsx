import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Timeline from './Components/Timeline'
import SignUp from './Pages/Sign-Up'

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
      
       
    </div>
  )
}

export default App
