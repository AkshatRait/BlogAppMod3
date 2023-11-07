import "./index.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import axios from "axios";
import { useContext, useState } from "react";
import { primaryContext } from "../../Context/PrimaryProvider";


const Post = ({post}) => {
  const [liked,setLiked] = useState(false)
  const [editing,setEditing] = useState(null)

  const [updatedFormData,setUpdatedFormData] = useState({
    image: "",
    caption: ""
  })

  const {deletePostStatus, setDeletePostStatus,submitHappened,setSubmitHappened} = useContext(primaryContext);

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
    <div>
      <form onSubmit={(e) => handleSubmit(e,post._id)}>
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
            <button type='submit'>POST</button>
        </form>
    </div>
    )
  }else{
    return (
      <div key={post._id}id='timeline-post'>
          <img src={post.image} alt="" />
          <div className="post-buttons">
              <FavoriteBorderIcon />
              <ChatBubbleOutlineIcon />
              <IosShareIcon />
          </div>
          <h3>{post.caption}</h3>
          <button onClick={()=> setEditing(true)}>Edit Post</button>
          <button onClick={()=>deletePost(post._id)}>Delete</button>
      </div>
    )
  }
}

export default Post