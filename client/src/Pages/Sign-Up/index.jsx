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
import validator from 'validator'
import axios from 'axios';
import { primaryContext } from '../../Context/PrimaryProvider';

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

    // const [formErrors, setFormErrors] = React.useState({});

    const {users,setUsers} = React.useContext(primaryContext)

//   const validateFormData = () => {
//     const errors = {};

//     if (!validator.isEmail(signupFormData.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (signupFormData.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters long';
//     }


//     return errors;
//   };
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
    console.log("submit")

    const handleSubmit = (e) => {
        e.preventDefault();
        // const errors = validateFormData();

        
            try {
             axios({
                method: "POST",
                url: "/server/createUser",
                data: signupFormData
             }).then((res)=>{
                 setUsers((users) => [...users, res.data]);
                 setSignupFormData({ 
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"", 
                }); // Clear the form on success
             })
            
            } catch (err) {
              console.log(err);
              // Handle API error here and show an appropriate error message to the user
            }
        //   } else {
        //     setFormErrors(errors); // Set validation errors in the state
        //   }

      };
    
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
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    {/* {formErrors.email && <p className="error">{formErrors.email}</p>} */}

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
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
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
  )
}

export default SignUp