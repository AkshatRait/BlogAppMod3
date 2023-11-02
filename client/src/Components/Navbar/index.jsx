import { Link } from "react-router-dom";
import "./index.css"
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { primaryContext } from "../../Context/PrimaryProvider";

const Navbar = () => {
   const {addingPost,setAddingPost} = useContext(primaryContext)
    
  return (
    <div class="navigation">
   <div class="logo">
      <Link class="no-underline" href="#">
      Bloggers Spot
      </Link>
   </div>
   <div class="navigation-search-container">
      <i class="fa fa-search"></i>
      <input class="search-field" type="text" placeholder="Search"/>
      <div class="search-container">
         <div class="search-container-box">
            <div class="search-results">
            </div>
         </div>
      </div>
   </div>
   <div class="navigation-icons">
      <Link onClick={()=>setAddingPost(
         addingPost ? null : true
      )} class="navigation-link notification">
            <AddIcon />
      </Link>
      <Link to="" class="navigation-link">
      <PersonIcon />
      </Link>
      <Link to="" id="signout" class="navigation-link">
      <LogoutIcon />
      </Link>
   </div>
</div>
  )
}

export default Navbar