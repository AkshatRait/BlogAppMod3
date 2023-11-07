import "./index.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import axios from "axios";
import { useContext, useState } from "react";
import { primaryContext } from "../../Context/PrimaryProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Post = ({post}) => {
  const [liked,setLiked] = useState(true)
  const [editing,setEditing] = useState(null)

  const [updatedFormData,setUpdatedFormData] = useState({
    image: "",
    caption: ""
  })

  const {deletePostStatus, setDeletePostStatus,submitHappened,setSubmitHappened,user,setUser} = useContext(primaryContext);

  const handleChange = (e)=>{
    const { name,value } = e.target;
    setUpdatedFormData((prevState) => ({
        ...prevState,
        [name]: value
    }));
  }
    
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
      console.log(err)
    }
  }
  
  const handleSubmit=(e,id)=>{
    e.preventDefault()
    try{
      axios({
        method: "PUT",
        url: `/server/editPost?idOfPost=${id}`,
        data: updatedFormData
      }).then((res)=>{
        if(!submitHappened){
          setSubmitHappened(true)
        }else{
          setSubmitHappened(true)
        }
        console.log("Editing");
        setEditing(false)
      })
    }catch(err){
      console.log(err)
    }
    
  }
  if(editing){
    return (
    <div className="editing-form">
      <form onSubmit={(e) => handleSubmit(e,post._id)}>
        <p>Edit Post with Id: {post._id}</p>
            <label htmlFor="image">Update the image here:</label>
            <input 
            type="text"
            value={updatedFormData.image}
            name="image"
            id="image"
            placeholder='New Image Url'
            onChange={handleChange} />
            <label htmlFor="image">Add a caption here:</label>
            <input 
            type="text"
            value={updatedFormData.caption}
            name="caption"
            placeholder='New Beautiful caption waiting for you'
            onChange={handleChange} 
            id="caption" />
            <div className="edit-buttons">
              <button onClick={()=>{setEditing(null)}}>Back</button>
              <button type='submit'>POST</button>
            </div>
        </form>
    </div>
    )
  }else{
    return (
      <div key={post._id}id='timeline-post'>
        <div className="post-bar"><h4>{user}</h4><p>{post.createdAt}</p></div>
          <img src={post.image} alt="" />
          {!post.image == "" ? 
          <div>
            <div className="post-buttons">
            <div onClick={!liked ? ()=>setLiked(true) : ()=>setLiked(false)}>{liked ? <FavoriteBorderIcon  /> : <FavoriteIcon sx={{ color: "red" }}/>}</div> 
            <button onClick={()=> setEditing(true)}><EditIcon/></button>
            <button onClick={()=>deletePost(post._id)}><DeleteIcon/></button>
          </div>
          <p>{user}-{post.caption}</p>
          </div> : 
          <div>
            <p>{user}-{post.caption}</p>
            <div className="post-buttons">
            <div onClick={!liked ? ()=>setLiked(true) : ()=>setLiked(false)}>{liked ? <FavoriteBorderIcon  /> : <FavoriteIcon sx={{ color: "red" }}/>}</div> 
            <button onClick={()=> setEditing(true)}><EditIcon/></button>
            <button onClick={()=>deletePost(post._id)}><DeleteIcon/></button>
            </div>
          </div>}
          
          
      </div>
    )
  }
}

export default Post