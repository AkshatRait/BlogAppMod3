import React, { useContext, useState } from 'react'
import "./index.css"
import { primaryContext } from '../../Context/PrimaryProvider'
import axios from 'axios'

const PostPage = () => {
    const [postFormData,setPostFormData] = useState({
      image: "",
      caption: ""
    })

//   const {addingPost,setAddingPost}= useContext(primaryContext);
const {setSubmitHappened}=useContext(primaryContext)

  const handleChange = (e)=>{
    const { name,value } = e.target;
    setPostFormData((prevState) => ({
        ...prevState,
        [name]: value
    }));
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    try{
        axios({
            method: "POST",
            url: "/server/createPost",
            data: postFormData
        }).then((res)=>{
          console.log("Submitted successfully",res)
          setSubmitHappened(true)
        })
    }catch(err){
        console.log(err,"error occurred in submitted post")
    }
    setPostFormData({
      image:"",   
      caption: ""
    })
  }
  
  return (
    <div className='post'>
        <h3>Create Post Here!</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="image">Add an image here:</label>
            <input 
            type="text"
            value={postFormData.image}
            name="image"
            id="image"
            placeholder='Image Url'
            onChange={handleChange} />
            <label htmlFor="image">Add a caption here:</label>
            <input 
            type="text"
            value={postFormData.caption}
            name="caption"
            placeholder='Beautiful caption waiting for you'
            onChange={handleChange} 
            id="caption" />
            <button type='submit'>POST</button>
        </form>
    </div> 
  )
}

export default PostPage