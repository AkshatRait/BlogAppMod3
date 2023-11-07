import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Timeline from './Components/Timeline'
import SignUp from './Pages/Sign-Up'
import SignIn from './Pages/SignIn/SignIn'
import MakeProfile from './Components/MakeProfile'
import ProfilePage from './Pages/ProfilePage'

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>
      
       
    </div>
  )
}

export default App
