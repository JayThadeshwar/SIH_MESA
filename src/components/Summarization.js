import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Grid from '@material-ui/core/Grid';
import Header from "./Header"
import Footer from "./common/Footer"
import LoadingSpinner from "../utility/LoadingSpinner";
import * as con from '../constants'
import Navbar from "./common/Navbar";

const useStyles = makeStyles((theme) => ({
  summarization: {
    display: 'flex',
    '& > *': {
      //   backgroundColor: blue[50],
    },
  },
  bluecolor: {
    backgroundColor: lightblue[300],
    padding: 30
  },
  bluecolorcpy: {
    backgroundColor: lightblue[300],
  },

}));


function SummarizeAndTranslate() {

  const location = useLocation();
  const itemInfo = location.state.id

  const [stContent, setStContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(itemInfo)
    navigate("/grammar", { state: { id: itemInfo } });
  };

  const fetchSummaryNTranslation = async () => {
    console.log(itemInfo['summaryNTranslation'])
    setStContent(itemInfo['summaryNTranslation'])
  }

  useEffect(() => {
    fetchSummaryNTranslation()
  }, []);

  return (
    <div>
      <Navbar />
      <div className="summarisation">
        {/*       
      <Paper elevation={3} style = {{width: '100%'}}>
        <Box p={1.5} className={classes.bluecolor}>
          <Typography variant="h4" style={{ textAlign: 'left' , color:'white'}}>
            Summarization
          </Typography><br/>
          <Paper elevation={2}>
          <Typography style={{ textAlign: 'left' , padding:10}}>
            {
              isLoading ? <LoadingSpinner/> : stContent['summary']
            }
          </Typography>
          </Paper>          
            <br/>
          <Typography variant="h4" style={{ textAlign: 'left' , color:'white'}}>
            Translation
          </Typography><br/>
          <Paper elevation={2}>
            <Typography style={{ textAlign: 'left', padding: 10 }}>
            {
              isLoading ? <LoadingSpinner/> : stContent['translation']
            }
            </Typography>
          </Paper>          

        </Box>
      <br/>
      <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'right' , paddingRight: 30}}>
            <Grid item>
              <Button variant="contained" className={classes.bluecolorcpy} onClick={() => {navigate("/vocabdev");}}>
                BACK
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" className={classes.bluecolorcpy} onClick={handleSubmit}>
                PROCEED
              </Button>
            </Grid>
      </Grid>
          <br/>
      </Paper> */}

        <div className="container">


          <h1 className="display-4 text-center" style={{ "margin": "20px 30px;" }}>Summarization</h1>
          <div className="row">

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="exampleFormControlTextarea2" class="form-label">Summarization</label>
              <textarea class="form-control" id="exampleFormControlTextarea2" value={stContent['summary']} rows="8">
                {
                  isLoading ? <LoadingSpinner /> : ''
                }
              </textarea>

            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

              <label for="exampleFormControlTextarea3" class="form-label">Translation</label>
              <textarea class="form-control" id="exampleFormControlTextarea2" value={stContent['translation']} rows="8">
                {
                  isLoading ? <LoadingSpinner /> : ''
                }
              </textarea>
            </div>
          </div>
          <button style={{ "margin": "5px" }} type="button" class="btn btn-primary" onClick={() => { navigate("/vocabdev"); }}>Back</button>
          <button style={{ "margin": "5px" }} type="button" class="btn btn-primary" onClick={handleSubmit}>Proceed</button>
        </div>
      </div>
      <div><br />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default SummarizeAndTranslate;