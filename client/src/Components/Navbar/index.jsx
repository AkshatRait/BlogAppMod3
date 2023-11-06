import { Link } from "react-router-dom";
import "./index.css"
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { primaryContext } from "../../Context/PrimaryProvider";
import MakeProfile from "../MakeProfile";

const Navbar = () => {
   const {addingPost,setAddingPost,currentLoggedInUser} = useContext(primaryContext)
  return (
    <div className="navigation">
   <div className="logo">
      <Link className="no-underline" href="/">
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
      <Link to="/makeprofile" className="navigation-link">
         <PersonIcon />
      </Link>
      <Link to="" id="signout" className="navigation-link">
         <LogoutIcon />
      </Link>
   </div>
</div>
  )
}

export default Navbar