import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Timeline from './Components/Timeline'
import SignUp from './Pages/Sign-Up'
import SignIn from './Pages/SignIn/SignIn'
import MakeProfile from './Components/MakeProfile'

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/makeprofile" element={<MakeProfile />}/>
      </Routes>
      
       
    </div>
  )
}

export default App
