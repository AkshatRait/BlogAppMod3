import * as React from 'react';
import "./index.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { primaryContext } from '../../Context/PrimaryProvider';
import {Link as RouterLink} from 'react-router-dom'
import SignIn from '../SignIn/SignIn';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const defaultTheme = createTheme();


const SignUp = () => {

const [existingUserError,setExistingUserError] = React.useState('');


    const {users,setUsers,
      isLoggedIn,setIsLoggedIn,
      currentLoggedInUser, 
      setCurrentLoggedInUser,
    newUser,
  setNewUser,
  cameFromSignUp,setCameFromSignUp} = React.useContext(primaryContext)

    const [signupFormData,setSignupFormData] = React.useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })

    const handleChange = (e) =>{
        const {id,value} = e.target;
        setSignupFormData((prevState)=>({
            ...prevState,
            [id]: value
        }));
    }
    

    const handleSubmit = (e) => {
      e.preventDefault();
      // const errors = validateFormData();
    
      try {
        axios({
          method: "POST",
          url: "/server/createUser",
          data: signupFormData
        })
          .then((res) => {
            setNewUser(true)
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            console.log(currentLoggedInUser);
            setSignupFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }); // Clear the form on success
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setExistingUserError(error.response.data.message);
            } else {
              // Handle other errors
              console.error('An error occurred:', error);
            }
          });
        // Handle API error here and show an appropriate error message to the user
      } catch (error) {
        // Handle other non-Axios errors here
        console.error('An error occurred:', error);
      }
    };


    if(!currentLoggedInUser){
      return <SignIn />
    }else{
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={signupFormData.firstName}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={signupFormData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </Grid>
                  {existingUserError && <div className="error-message">{existingUserError}</div>}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={signupFormData.email}
                      onChange={handleChange}
                    />
  
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={signupFormData.password}
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                    {/* {formErrors.password && <p className="error">{formErrors.password}</p>} */}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <RouterLink onClick={setCameFromSignUp(true)}to="/signin" variant="body2">
                      Already have an account? Sign in
                    </RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
  )

    }
    
}

export default SignUp