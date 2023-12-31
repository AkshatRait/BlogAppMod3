import { useContext, useState } from "react"
import "./index.css"
import { primaryContext } from "../../Context/primaryProvider"
import axios from "axios"
import { Button, TextField } from "@mui/material"

const CreatePost = () => {
  const [showInput,setShowInput] = useState(false)
  const [postFormData,setPostFormData] = useState({
    caption: "",
    image: ""
  })
  const {setSubmitHappened,currentLoggedInUser}=useContext(primaryContext);
  const handleChange = (e)=>{
    const { name,value } = e.target;
    setPostFormData((prevState) => ({
        ...prevState,
        [name]: value
    }));
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
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
    setSubmitHappened(null)
    setPostFormData({
      caption: "",
      image: "",
    })
  }
  
  return (
    <div id='create-post'>
        <div className="profile">
            <img src="https://nickelodeonuniverse.com/wp-content/uploads/Squidward.png" alt="" />
        </div>
        <TextField sx={{backgroundColor:"white",height:"60%",marginTop:"15px"}}type="text"
            value={postFormData.caption}
            name="caption"
            placeholder='Write Something Here!'
            onChange={handleChange} 
            id="caption" variant="filled" color="primary"/>
            <Button sx={{height:"60%",backgroundColor:"white"}}variant="outlined" onClick={!showInput ? ()=>setShowInput(true) : ()=>setShowInput(false)}>{!showInput ? <p>Show More:</p>: <p>Show Less:</p>}</Button>
            <span></span>
            {showInput ? <TextField
             sx={{backgroundColor:"white",height:"80%",marginTop:"10px"}}
            type="text"
            value={postFormData.image}
            name="image"
            placeholder='Add an Image Here!'
            onChange={handleChange} 
            id="image"
            variant="outlined" /> : null}
        <Button sx={{height:"50%",backgroundColor:"white"}}variant="outlined" className="submit"onClick={handleSubmit}type="submit">Post</Button>
    </div>
  )
}

export default CreatePost