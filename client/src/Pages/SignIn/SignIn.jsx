import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useActionData} from 'react-router-dom'
import axios from 'axios';
import { primaryContext } from '../../Context/primaryProvider';
import "./index.css"
import SignUp from '../Sign-Up';


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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignIn=()=> {

  const [signinFormData,setSigninFormData] = React.useState({
    email:"",
    password:"",
})
const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

const {setUser,user,currentLoggedInUser, setCurrentLoggedInUser,isLoggedIn, setIsLoggedIn,loggedOut,
  setLoggedOut} = React.useContext(primaryContext)

const handleSubmit = (e) => {
  e.preventDefault();
  try {
    const userEmail = signinFormData.email;
    const userPassword = signinFormData.password;

    axios({
      method: "POST",
      url: `/server/getSignedinUser`,
      data: signinFormData,
    })
      .then((res) => {
        setCurrentLoggedInUser(res.data.email);
        if (res.data.message === "Authentication successful") {
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
          
          // After successful authentication, retrieve user data
          axios({
            method: "GET",
            url: `/server/getUser/${signinFormData.email}`,
          }).then((res) => {
            localStorage.setItem("userName", res.data.user.firstName)
            setUser(res.data.user);
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message, '. Please check the password or create an account.');
      });
  } catch (err) {
    console.log(err);
  }
};

  

  const handleChange = (e) =>{
    const {id,value} = e.target;
    setSigninFormData((prevState)=>({
        ...prevState,
        [id]: value
    }));
}

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={signinFormData.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={signinFormData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
              {<p>{error}</p>}
              {isLoggedIn ? <div><p>Login Successful</p><RouterLink to="/home"><Button color="success"variant="contained">Proceed</Button></RouterLink></div> :  <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>}
            <Grid container>
              <Grid item>
                <RouterLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  ); 
        }


export default SignIn