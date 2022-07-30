import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Grid from '@material-ui/core/Grid';
import Header from "./Header"
import Footer from "./Footer"
import GmCard from "../utility/GrammarCard";
import SvoCard from "../utility/SvoCard";
import LoadingSpinner from "../utility/LoadingSpinner";
import * as con from '../constants'

const useStyles = makeStyles((theme) => ({
  grammar: {
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


function GrammaticalAndAssessment() {

  const [grammarUnderstanding, setGrammarUnderstanding] = useState([]);
  const [svoInfo, setSvoInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/assessment");
  };

  const fetchGrammar = async () => {
    setIsLoading(true)
    const response = await fetch(
      con.BASE_URI + "/grammar/" + location.state.id
    );
    const data = await response.json()

    let renderGrammar = (data["grammarticalInfo"]).map((item) => {
      return GmCard(item["sentence"], item["noun"], item["adjective"], item["verb"], item["coordinating conjunction"], item["adposition"])
    });

    let renderSvo = (data["svoInfo"]).map((item) => {
      return SvoCard(item["sentence"], item["subject"], item["verb"], item["object"], item["phrase"])
    });

    setIsLoading(false)
    setGrammarUnderstanding(renderGrammar)
    setSvoInfo(renderSvo)
  }

  useEffect(() => {
    fetchGrammar()
  }, []);


  return (
    <div>
      <Header></Header><br />
      <div className={classes.grammar}>

        <Paper elevation={3} style={{ width: '100%' }}>
          <Box p={1.5} className={classes.bluecolor}>
            <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
              Grammatical Understanding
            </Typography><br />
            <Paper elevation={2}>
              <Typography variant="h6" style={{ textAlign: 'left', padding: 10 }}>
                Parts of speech information
                <Divider />
                {isLoading ? <LoadingSpinner /> : grammarUnderstanding}
              </Typography>
            </Paper>
            <br />
            <Paper elevation={2}>
              <Typography variant="h6" style={{ textAlign: 'left', padding: 10 }}>
                Subject Verb Object information
                <Divider />
                {isLoading ? <LoadingSpinner /> : svoInfo}
              </Typography>
            </Paper>
            <br />        
          </Box>
          <br />
          <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'right', paddingRight: 30 }}>
            <Grid item>
              <Button variant="contained" className={classes.bluecolorcpy} onClick={() => { navigate("/summarization"); }}>
                BACK
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" className={classes.bluecolorcpy} onClick={handleSubmit}>
                PROCEED
              </Button>
            </Grid>
          </Grid>
          <br />
        </Paper>
      </div>
      <div><br />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default GrammaticalAndAssessment;