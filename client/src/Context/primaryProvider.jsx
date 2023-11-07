import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const primaryContext = createContext();

const PrimaryProvider = ({children}) =>{
//state
const [posts,setPosts] = useState([])
const [users,setUsers] = useState([])
const [addingPost,setAddingPost]= useState(null)
const [submitHappened, setSubmitHappened] = useState(null)
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [currentLoggedInUser, setCurrentLoggedInUser] = useState({name: "",image:""})
const [newUser, setNewUser] = useState(false)
const [cameFromSignUp,setCameFromSignUp] = useState(null)
const [deletePostStatus,setDeletePostStatus] = useState(null)
const [editProfile,setEditProfile] = useState(false)
const [user,setUser] = useState(null)
const [loggedOut,setLoggedOut] = useState(null)




useEffect(()=>{
    try{
        axios({
            method:"GET",
            url: "/server/getPosts"
        }).then((res)=>{
            const arrayPosts = res.data;
            setPosts(arrayPosts)
        })
    }catch(err){
        console.log("error while getting posts in context")
    }
},[submitHappened])



return (
    <primaryContext.Provider value={{
        users,
        setUsers,
        posts,
        setPosts,
        addingPost,
        setAddingPost,
        submitHappened, 
        setSubmitHappened,
        isLoggedIn, 
        setIsLoggedIn,
        currentLoggedInUser, 
        setCurrentLoggedInUser,
        newUser, 
        setNewUser,
        cameFromSignUp,
        setCameFromSignUp,
        deletePostStatus,
        setDeletePostStatus,
        editProfile,
        setEditProfile,
        user,
        setUser,
        loggedOut,
        setLoggedOut

    }}>
            {children}  
    {/* provider div */}
    </primaryContext.Provider>
)  

}

export default PrimaryProvider;