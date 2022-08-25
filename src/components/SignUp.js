// import * as React from 'react';
import * as con from '../constants'
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
// import { Link, useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from "@material-ui/styles";
// import bgsignup from '../images/BGSIGNup.png';
// import olsp from '../images/online learning signup.png';
// import lightblue from "@material-ui/core/colors/lightBlue";
// import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//   bgimg: {
//     height: '500px',
//     paddingTop: 75,
//     paddingLeft: 100,
//   },
//   formcls: {
//     paddingTop: 40,
//     paddingLeft: 100,
//   },
//   bluecolorcpy: {
//     backgroundColor: lightblue[300],
//     fontSize: 20,
//     border: 10,
//   },
// }));


// function Signup() {
//   const classes = useStyles();
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     var data = {
//       "userName": event.target.username.value,
//       "emailId": event.target.email.value,
//       "password": event.target.password.value,
//     }

//     axios.post(con.BASE_URI + '/user', data)
//       .then(response => {
//         navigate("/login");
//       }).catch(function (error) {
//         console.log(error)
//       });

//   };

//   return (
//     <Grid container spacing={2} sx={{ height: '100vh' }}>
//       <Grid item xs={4} sx={{
//         backgroundImage: 'url(' + bgsignup + ')',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'left',
//       }} ><img src={olsp} alt='Img' className={classes.bgimg} /> </Grid>
//       <Grid item xs={8} >
//         <Box className={classes.formcls}
//           sx={{
//             my: 8,
//             mx: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >

//           <Typography component="h1" variant="h4">
//             Register Here
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//             <center><TextField style={{ width: '80%' }}//               
//               required
//               id="fullname"
//               label="Full Name"
//               name="fname"
//               autoFocus
//             />
//               <TextField style={{ width: '80%' }}//                 
//                 required
//                 id="uname"
//                 label="User Name"
//                 name="username"
//               />
//               <TextField style={{ width: '80%' }}//                 
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//               />
//               <TextField style={{ width: '80%' }}//                 
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//               /><br /><br />
//               <Button style={{ backgroundColor: lightblue[300], fontSize: 20, border: 10, }} variant="contained" type="submit">
//                 Register
//               </Button>  <br /><br />
//               <Grid item>I have an account!
//                 <Link to="/login" variant="body1">
//                   {" Login"}
//                 </Link>
//               </Grid>
//             </center>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>

//   );
// }

// export default Signup;

import React from 'react'
import TextField from '@mui/material/TextField';
import olsp from '../images/online learning signup.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      "userName": event.target.username.value,
      "emailId": event.target.email.value,
      "password": event.target.password.value,
    }

    axios.post(con.BASE_URI + '/user', data)
      .then(response => {
        navigate("/login");
      }).catch(function (error) {
        console.log(error)
      });

  };
  return (
    <div className="Signup">
      <div className="container-fluid pt-3">
        <div className="row m-0">
          <div className="d-none d-lg-block col-lg-6 col-md-0 col-sm-0 col-xs-0">
            <img src={olsp} className="img-fluid h-100" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
            <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-4">

              <h1 className="font-weight-bold">{t("Register_Here")}</h1>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-75"> 

                <TextField 
                  // style={{ width: '80%' }}
                  required
                  id="fullname"
                  label={t("FullName")}
                  name="fname"
                  autoFocus
                />
                <TextField 
                  // style={{ width: '80%' }}
                  required
                  id="uname"
                  label={t("UserName")}
                  name="username"
                />
                <TextField 
                  // style={{ width: '80%' }}
                  required
                  fullWidth
                  id="email"
                  label={t("EmailAddress")}
                  name="email"
                  autoComplete="email"
                />
                <TextField 
                  // style={{ width: '80%' }}
                  required
                  fullWidth
                  name="password"
                  label={t("Password")}
                  type="password"
                  id="password"
                />
                <div className='text-center'>
                  <button className="btn btn-outline-primary btn-lg" type="submit">{t("Register")}</button>
                </div>
              </form>


              <div>
                <p className='lead'>{t("AlreadyRegistered")} <Link to="/login">{" Login"}</Link></p>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp