import React, { useContext, useEffect, useState } from 'react'
import { primaryContext } from '../../Context/PrimaryProvider';
import axios from 'axios';
import Timeline from '../../Components/Timeline';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const {currentLoggedInUser,setCurrentLoggedInUser,user,setUser} = useContext(primaryContext)

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
                let name = currentLoggedInUser.name
                let image = currentLoggedInUser.image
                localStorage.setItem("loggedInUser" , name)
                localStorage.setItem("loggedInImage" , image)

            })
        }catch(err){
            console.log(err,"error occurred in submitted profile")
        }
        setProfileFormData({
          image:"",   
          name: ""
        })
      }

      console.log(user)

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
                  <Link to="/">
                    <button type='submit'>POST</button>
                  </Link>
              </form>
          </div> 
        )
      }

}

export default ProfilePage