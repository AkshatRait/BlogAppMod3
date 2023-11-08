import React, { useContext, useState } from 'react'
import "./index.css"
import { primaryContext } from '../../Context/primaryProvider'
import axios from 'axios'
import { Button, TextField } from '@mui/material'

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
        setSubmitHappened(null)
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
        <h3>Create a Post Here!</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="image">Add an image here:</label>
            <TextField
            type="text"
            value={postFormData.image}
            name="image"
            id="image"
            placeholder='Image Url'
            onChange={handleChange} />
            <label htmlFor="image">Add a caption here:</label>
            <TextField 
            type="text"
            value={postFormData.caption}
            name="caption"
            placeholder='Beautiful caption waiting for you'
            onChange={handleChange} 
            id="caption" />
            <Button sx={{marginTop:'5px',width:'20%',backgroundColor:"#718093",color:'white'}}variant="outlined"type='submit'>POST</Button>
        </form>
    </div> 
  )
}

export default PostPage