import "./index.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import axios from "axios";
import { useContext } from "react";
import { primaryContext } from "../../Context/PrimaryProvider";


const Post = ({post}) => {
    
  const {deletePostStatus, setDeletePostStatus} = useContext(primaryContext);

  const deletePost = (id)=>{
    try{
      axios({
        method: "DELETE",
        url: "/server/deletePost",
        data: {id : id}
      }).then((res)=>{
        console.log("deletion successful");
        setDeletePostStatus(true)
      })
    }catch(err){

    }
  }

  return (
    <div key={post._id}id='timeline-post'>
        <img src={post.image} alt="" />
        <div className="post-buttons">
            <FavoriteBorderIcon />
            <ChatBubbleOutlineIcon />
            <IosShareIcon />
        </div>
        <h3>{post.caption}</h3>
        <button onClick={()=>deletePost(post._id)}>Delete</button>
    </div>
  )
}

export default Post