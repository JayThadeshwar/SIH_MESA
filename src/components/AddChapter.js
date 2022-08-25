import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@mui/material/Alert';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import Footer from "./common/Footer";
import TextField from '@mui/material/TextField';
import * as con from '../constants'
import FileUpload from "./FileUpload";
import axios from 'axios';
import LoadingSpinner from "../utility/LoadingSpinner";
const useStyles = makeStyles((theme) => ({
  addchap: {
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


function AddStudyChapter() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    name: '',
    content: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasErr, sethasErr] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const handleChangeForm = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setIsLoading(true)
    event.preventDefault();

    const uId = localStorage.getItem('userId')

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: uId,
        name: values.name,
        content: values.content
      })
    };
    fetch(con.BASE_URI + "/chapters", requestOptions)
      .then(response => {
        console.log(response)
        setIsLoading(false)
        if (response.status === 201)
          navigate("/home");
        else
          sethasErr(true)
      }).catch(err => {
        setIsLoading(false)
        console.log(err)
        sethasErr(true)
      })

  };
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("url", "URL-of-Image-or-PDF-file");
    formData.append("language", "eng");
    formData.append("apikey", "K89640252288957");
    formData.append("isOverlayRequired", true)
    try {
      const res = await axios.post(
        "https://api.ocr.space/parse/image",
        formData
      );
      let brve = values.content

      setValues({ ...values, content: brve + "\n" + res.data.ParsedResults[0]?.ParsedText || "" + "\n" + res.data.ParsedResults[1]?.ParsedText || "" + "\n" + res.data.ParsedResults[2]?.ParsedText || "" + "\n" });
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      <Header></Header><br />
      {hasErr ?
        <>
          <Alert severity="error">
            Unable to add chapter, please try again.
          </Alert><br />
        </>
        : <></>}
      {
        isLoading ? 
        <LoadingSpinner></LoadingSpinner>
        :
      <div className={classes.addchap}>

        <Paper elevation={3} style={{ width: '100%' }}>
          <Box p={1.5} className={classes.bluecolor}>
            <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
              Chapter Name
            </Typography><br />
            <Paper elevation={2}>
              <TextField onChange={handleChangeForm("name")} id="outlined-basic" placeholder='Enter Chapter Name' variant="outlined" style={{ width: '100%' }} />
            </Paper>
            <br />
            <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
              Chapter Data
            </Typography><br />
            <Paper elevation={2}>
              <TextField onChange={handleChangeForm("content")} value={values.content} id="outlined-multiline-static" multiline rows={10} placeholder="Enter Chapter's Content" style={{ width: '100%' }} />
            </Paper>
          </Box>
          <br />
          <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'right', paddingRight: 30 }}>
          <Grid item>
              <FileUpload uploadFile={uploadFile} setFile={setFile} setFileName={setFileName} />  
              </Grid>
            <Grid item>
              <Button variant="contained" className={classes.bluecolorcpy} onClick={() => { navigate("/home"); }}>
                BACK
              </Button>              
            </Grid>
            <Grid item>
              <Button variant="contained" className={classes.bluecolorcpy} onClick={handleSubmit}>
                ADD CHAPTER
              </Button>
            </Grid>
          </Grid>
          <br />
        </Paper>
      </div>
      }      
      <div><br />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default AddStudyChapter;