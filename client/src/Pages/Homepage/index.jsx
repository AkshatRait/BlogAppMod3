import { useContext, useEffect, useState } from "react"
import Timeline from "../../Components/Timeline"
import "./index.css"
import { primaryContext } from "../../Context/PrimaryProvider"
import PostPage from "../Post"
import SignIn from "../SignIn/SignIn"
import MakeProfile from "../../Components/MakeProfile"
import axios from "axios"

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const {setUser,user,addingPost,setAddingPost,isLoggedIn,setIsLoggedIn,newUser,setNewUser,cameFromSignUp,setCameFromSignUp,editProfile,setEditProfile} = useContext(primaryContext)

console.log(user)
  if(cameFromSignUp){
    setNewUser(true)
  }
useEffect(()=>{
  const storedLoggedIn = localStorage.getItem("isLoggedIn");
try{
  if(storedLoggedIn === "true"){
    setIsLoggedIn(true);
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  }else{
    setIsLoggedIn(false)
    setIsLoading(false);
  }
}catch(err){
    console.error("erorr fetching data from local storage",err)
    setIsLoading(false)
  }
},[])


  return (
    <div>
      {isLoading ? <p>Loading...</p> : isLoggedIn ?   <div id="homepage">
        {isLoggedIn ? newUser ? <MakeProfile /> : addingPost ? <PostPage /> : <Timeline /> : <SignIn />}
    </div> : <p>No data found</p>}
    </div>
    
  )
}

export default HomePage