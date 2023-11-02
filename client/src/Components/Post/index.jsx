import "./index.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';


const Post = ({post}) => {
    
  return (
    <div key={post._id}id='timeline-post'>
        <img src={post.image} alt="" />
        <div className="post-buttons">
            <FavoriteBorderIcon />
            <ChatBubbleOutlineIcon />
            <IosShareIcon />
        </div>
        <h3>{post.caption}</h3>
    </div>
  )
}

export default Post