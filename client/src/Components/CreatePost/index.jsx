import { useContext, useState } from "react"
import "./index.css"
import { primaryContext } from "../../Context/primaryProvider"
import axios from "axios"

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
        <input 
            type="text"
            value={postFormData.caption}
            name="caption"
            placeholder='Write Something Here!'
            onChange={handleChange} 
            id="caption" />
            <button onClick={!showInput ? ()=>setShowInput(true) : ()=>setShowInput(false)}>show More:</button>
            {showInput ? <input 
            type="text"
            value={postFormData.image}
            name="image"
            placeholder='Add an Image Here!'
            onChange={handleChange} 
            id="image" /> : null}
        <button className="submit"onClick={handleSubmit}type="submit">Post</button>
    </div>
  )
}

export default CreatePost