import { useContext, useState } from "react"
import "./index.css"
import { primaryContext } from "../../Context/PrimaryProvider"
import axios from "axios"

const CreatePost = () => {
  const [postFormData,setPostFormData] = useState({
    caption: ""
  })
  const {setSubmitHappened}=useContext(primaryContext);
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
      caption: ""
    })
  }
  
  return (
    <div id='create-post'>
        <div className="profile">
            <img src="https://www.spongebobshop.com/cdn/shop/products/SB-Standees-Spong-2_800x.jpg?v=1603744569" alt="" />
        </div>
        <input 
            type="text"
            value={postFormData.caption}
            name="caption"
            placeholder='Write Something Here!'
            onChange={handleChange} 
            id="caption" />
        <button onClick={handleSubmit}type="submit">Post</button>
    </div>
  )
}

export default CreatePost