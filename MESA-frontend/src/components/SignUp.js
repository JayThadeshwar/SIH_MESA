import * as React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/styles";
import bgsignup from '../images/BGSIGNup.png';
import olsp from '../images/online learning signup.png';
import lightblue from "@material-ui/core/colors/lightBlue";


const useStyles = makeStyles((theme) => ({
    bgimg: {
        height: '500px',
        paddingTop:75,
        paddingLeft: 100,
    },
    formcls: {
        paddingTop: 40,
        paddingLeft: 100,
    },
    bluecolorcpy: {
        backgroundColor: lightblue[300],
        fontSize: 20,
        border:10,
      },
  }));


function Signup() {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <Grid container spacing={2} sx={{height: '100vh'}}>
    <Grid item xs={4} sx={{
        backgroundImage: 'url('+bgsignup+')' ,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
    }} ><img src={olsp} alt='Img' className={classes.bgimg}/> </Grid>
    <Grid item xs={8} >
    <Box className={classes.formcls}
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h4">
              Register Here
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <center><TextField style={{width:'80%'}}
                margin="normal"
                required
                id="fullname"
                label="Full Name"
                name="fname"
                autoFocus
              />
              <TextField style={{width:'80%'}}
                margin="normal"
                required
                id="uname"
                label="User Name"
                name="username"
              />
              <TextField style={{width:'80%'}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField style={{width:'80%'}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              /><br /><br />
              <Button style={{backgroundColor: lightblue[300],fontSize: 20,border:10,}} variant="contained" onClick={handleSubmit}>
                Register
            </Button>  <br/><br/>          
            <Grid item>I have an account! 
                  <Link to="/login" variant="body1">
                    {" Login"}
                  </Link>
                </Grid>
              </center>  
            </Box>
          </Box>
    </Grid>
  </Grid>

  );
}

export default Signup;