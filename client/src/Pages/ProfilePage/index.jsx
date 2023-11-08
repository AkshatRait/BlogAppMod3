import React, { useContext, useEffect, useState } from 'react';
import { primaryContext } from '../../Context/primaryProvider';
import axios from 'axios';
import Timeline from '../../Components/Timeline';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ProfilePage = () => {
  const { currentLoggedInUser, setCurrentLoggedInUser, user, setUser, setSubmitHappened } = useContext(primaryContext);

  const [profileMade, setProfileMade] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileMade(true);

    setSubmitHappened(true);
    setProfileFormData({
      image: '',
      name: '',
    });
    setSubmitHappened(null);
  };


  if (profileMade) {
    return <Timeline />;
  } else {
    return (
    //   <div className="profile">
    //     <h3>Add a profile pic</h3>
    //     <form onSubmit={handleSubmit}>
    //       <label htmlFor="name">Add an username here:</label>
    //       <input
    //         type="text"
    //         value={profileFormData.name}
    //         name="name"
    //         id="name"
    //         placeholder="Username"
    //         onChange={handleChange}
    //       />
    //       <label htmlFor="image">Add a profile picture here:</label>
    //       <input
    //         type="text"
    //         value={profileFormData.image}
    //         name="image"
    //         placeholder="Image"
    //         onChange={handleChange}
    //         id="image"
    //       />
    //     </form>
    //   </div>
    // );
    <div>
      <h1>Under Construction</h1>
          <Link to="/home">
              <Button variant="outlined" type="submit">Go back</Button>
          </Link>
    </div>)
  }
};

export default ProfilePage;
