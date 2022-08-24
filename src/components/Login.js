// import * as React from 'react';
// import * as con from '../constants'
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from "@material-ui/styles";
// import bgsignup from '../images/BGSIGNup.png';
// import ollp from '../images/online learning login.png';
// import lightblue from "@material-ui/core/colors/lightBlue";
// import eclipse from '../images/Ellipse 1.png';


// const useStyles = makeStyles((theme) => ({
//   bgimg: {
//     paddingTop: 100,
//     paddingLeft: 200,
//   },
//   formcls: {
//     paddingLeft: 100,
//   },
//   bluecolorcpy: {
//     backgroundColor: lightblue[300],
//     fontSize: 20,
//     border: 10,
//   },
//   elipse: {
//     display: 'flex',
//     justifyContent: 'right',
//     alignItems: 'right',
//   },
// }));


// function Signup() {
//   const classes = useStyles();
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     var data = {

//       "emailId": event.target.email.value,
//       "password": event.target.password.value,
//     }

//     axios.post(con.BASE_URI + '/user/validate', data)
//       .then(response => {

//         if (response.data.isValid) {
//           navigate("/home")
//         }
//         else
//           alert("Invalid credentials")
//             ;
//       }).catch(function (error) {
//         console.log(error)
//       });

//   };

//   return (
//     <div>
//       <Grid container spacing={2} sx={{ height: '100vh' }}>
//         <Grid item xs={4} sx={{
//           backgroundImage: 'url(' + bgsignup + ')',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'left',
//         }} ><img src={ollp} alt='Img' className={classes.bgimg} /></Grid>
//         <Grid item xs={8} >
//           <div className={classes.elipse}><img src={eclipse} alt='Ellipse' /> </div>
//           <Box className={classes.formcls}
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >

//             <Typography component="h1" variant="h4">
//               Welcome!
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <center>
// <TextField style={{ width: '80%' }}
//                   margin="normal"
//                   required
//                   id="email"
//                   label="Email ID"
//                   name="email"
//                 />
// <TextField style={{ width: '80%' }}
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                 /><br /><br />
//                 <Button style={{ backgroundColor: lightblue[300], fontSize: 20, border: 10, }} variant="contained" type="submit">
//                   Login
//                 </Button>  <br /><br />
//                 <Grid item>Don't have an account?
//                   <Link to="/signup" variant="body1">
//                     {" Register"}
//                   </Link>
//                 </Grid>
//               </center>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Signup;

import React from 'react'
import * as con from '../constants'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ollp from '../images/online learning login.png';
import TextField from '@mui/material/TextField';

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {

      "emailId": event.target.email.value,
      "password": event.target.password.value,
    }

    axios.post(con.BASE_URI + '/user/validate', data)
      .then(response => {

        if (response.data.isValid) {
          navigate("/home")
        }
        else
          alert("Invalid credentials");
      }).catch(function (error) {
        console.log(error)
      });

  };

  return (
    <div className="Login">
      <div className="container-fluid">
        <div className="row m-0">
          <div className="d-none d-lg-block col-lg-6 col-md-0 col-sm-0 col-xs-0 d-flex align-items-center justify-content-content">
            <img src={ollp} className="img-fluid w-100" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pt-5">
            <div className="d-flex flex-column gap-4 justify-content-center align-items-center h-100">
              <h1 className="font-weight-bold">Welcome</h1>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-75">
                <TextField
                  // style={{ width: '80%' }}
                  // margin="normal"
                  required
                  id="email"
                  label="Email ID"
                  name="email"
                />
                <TextField
                  // style={{ width: '80%' }}
                  // margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <div className='text-center'>
                  <button className="btn btn-outline-primary btn-lg" type="submit">LOGIN</button>
                </div>
              </form>

              <div>
                <p className='lead'>Don't have an account?<Link to="/signup">{" Register"}</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login