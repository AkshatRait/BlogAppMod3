import { useContext, useState } from "react"
import "./index.css" 
import axios from "axios"
import Timeline from "../Timeline";
import { primaryContext } from "../../Context/PrimaryProvider";

const MakeProfile = () => {
  const {currentLoggedInUser,setCurrentLoggedInUser} = useContext(primaryContext)

  const [profileMade,setProfileMade] = useState(false);
    const [profileFormData,setProfileFormData] = useState({
        name: "",
        image: "",
      })

    const handleChange = (e)=>{
        const { name,value } = e.target;
        setProfileFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
      }
      

      const handleSubmit = (e)=>{
        e.preventDefault()
        try{
            axios({
                method: "POST",
                url: "/server/makeProfile",
                data: profileFormData
            }).then((res)=>{
              console.log("Submitted successfully",res);
              setProfileMade(true)
              setCurrentLoggedInUser({name:profileFormData.name,
              image:profileFormData.image})
              console.log(currentLoggedInUser.image)
            })
        }catch(err){
            console.log(err,"error occurred in submitted post")
        }
        setProfileFormData({
          image:"",   
          name: ""
        })
      }

      if(profileMade){
        return <Timeline />
      }else{
        return (
          <div className='profile'>
              <h3>Add a profile pic</h3>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="image">Add an username here:</label>
                  <input 
                  type="text"
                  value={profileFormData.name}
                  name="name"
                  id="name"
                  placeholder='UseName'
                  onChange={handleChange} />
                  <label htmlFor="image">Add a profile picture here:</label>
                  <input 
                  type="text"
                  value={profileFormData.image}
                  name="image"
                  placeholder='image'
                  onChange={handleChange} 
                  id="image" />
                  <button type='submit'>POST</button>
              </form>
          </div> 
        )
      }

}

export default MakeProfile