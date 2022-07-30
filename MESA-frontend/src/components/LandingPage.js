import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Grid from '@material-ui/core/Grid';
import studentswebinar from '../images/landpageimage.png';
import eclipse from '../images/Ellipse 1.png';
import elipse from '../images/Ellipse 3.png';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  imgclass:{
    width: '600px',
    textAlign: 'center',
  },  
  elipse:{
    display: 'flex',
    justifyContent: 'right',
    alignItems:'right',
  },
  gridclass: {
    textAlign:'center',
  },
  type: {
    fontFamily: 'cursive',
    paddingLeft:30,
    
    color: lightblue[300],
  },
  subline: {
    fontSize:35
  },
  bluecolorcpy: {
    backgroundColor: lightblue[300],
    fontSize: 20,
    border:10,
  },
  btncpy: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'black'
  },
}));


function LandPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
        <div  className={classes.elipse}>
        <img src={eclipse} alt='Ellipse'/>   
        </div> 
        <Grid container spacing={2} className={classes.gridclass}>
        <Grid item xs={4}>
        <img src={studentswebinar} alt='Stand' style={{width: '600px',paddingLeft:15}}/>    
        </Grid>
        <Grid item xs={8}>
        <Typography variant='h2' className={classes.type} >Multilingual Education System</Typography>
        <p className={classes.subline}><center>The free, fun and effective <br />way of learning English!</center></p>
        <Button variant="contained" className={classes.bluecolorcpy} onClick={() => {navigate("/signup");}}>
                Get Started
        </Button>
        <br/><br/><Button variant="outlined"  className={classes.btncpy} onClick={() => {navigate("/login");}}>
                Already have an account?
              </Button>
              <div className={classes.elipse}>
        <img src={elipse} alt='Ellipse' width={400} height={170}/>   
        </div>
        </Grid>
        </Grid>
        
    </div>
    );
  }
  
  export default LandPage;