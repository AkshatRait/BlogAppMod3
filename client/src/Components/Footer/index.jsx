import { Link } from "react-router-dom";
import "./index.css"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const Footer = () => {
  return (
    <footer>
        <Link to="/home"><HomeIcon/></Link>
        <Link to=""><SearchIcon/></Link>
        <Link to=""><PersonIcon/></Link>
    </footer>
  )
}

export default Footer