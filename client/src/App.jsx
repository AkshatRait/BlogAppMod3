import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Timeline from './Components/Timeline'
import SignUp from './Pages/Sign-Up'
import MakeProfile from './Components/MakeProfile'
import ProfilePage from './Pages/ProfilePage'
import SignIn from './Pages/SignIn/SignIn'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { primaryContext } from './Context/primaryProvider'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/home/timeline" element={<Timeline />}/>
      </Routes>
      <Footer />
      
       
    </div>
  )
}

export default App
