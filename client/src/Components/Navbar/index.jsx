import { Link } from "react-router-dom";
import "./index.css"
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useState } from "react";
import { primaryContext } from "../../Context/primaryProvider";
import MakeProfile from "../MakeProfile";

const Navbar = () => {
   const {addingPost,setAddingPost,currentLoggedInUser,user,loggedOut,setLoggedOut,isLoggedIn} = useContext(primaryContext)
  return (
    <div className="navigation">
   <div className="logo">
      <Link className="no-underline" to="">
      Bloggers Spot
      </Link>
   </div>
   <div className="navigation-search-container">
      <i className="fa fa-search"></i>
      <input className="search-field" type="text" placeholder="Search"/>
      <div className="search-container">
         <div className="search-container-box">
            <div className="search-results">
            </div>
         </div>
      </div>
   </div>
   <div className="navigation-icons">
      <Link onClick={()=>setAddingPost(
         addingPost ? null : true
      )} className="navigation-link notification">
            <AddIcon />
      </Link>
      <Link to="/profile" className="navigation-link">
         <PersonIcon />
      </Link>
      <Link onClick={()=>setLoggedOut(true)} id="signout" className="navigation-link">
         <LogoutIcon />
      </Link>
      {user === 'string' ? <p className="name">{user.firstName}</p> : <></>}
   </div>
</div>
  )
}

export default Navbar