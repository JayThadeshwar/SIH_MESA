import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Footer from "./Footer";
import LoadingSpinner from "../utility/LoadingSpinner";
import * as con from "../constants";
import Chip from "@mui/material/Chip";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  vocabdevelopment: {
    display: "flex",
    "& > *": {
      //   backgroundColor: blue[50],
    },
  },
  bluecolor: {
    backgroundColor: lightblue[300],
    padding: 30,
  },
  bluecolorcpy: {
    backgroundColor: lightblue[300],
  },
}));

function VocabDevComp() {
  const location = useLocation();

  const [chapterContent, setChapterContent] = useState("");
  const [vocabContent, setVocabContent] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);
  const [isVocabContentLoading, setIsKeywordLoading] = useState(false);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/summarization", { state: { id: location.state.id } });
  };

  const fetchChp = async () => {
    setIsChapterLoading(true);
    const response = await fetch(
      con.BASE_URI + "/chapters/" + location.state.id
    );
    const data = await response.json();
    setIsChapterLoading(false);
    setChapterContent(data["content"]);
  };

  const fetchVocab = async () => {
    setIsKeywordLoading(true);
    const response = await fetch(
      con.BASE_URI + "/keyword/" + location.state.id
    );
    const data = await response.json();
    const renderData = data["keywords"].map((item) => {
      if(item["definition"].length <= 0 && item["synonyms"].length <= 0)
        return <div></div>   
      return (
        <Typography style={{ textAlign: "left", padding: 10 }}>
          <>
            <div>
              <span style={{ marginRight: "5px" }}>Word:</span>
              <span>
                <Chip label={item["word"]} color="primary" variant="outlined" />
              </span>
            </div>
            <div>
              <span style={{ marginRight: "5px" }}>Translation of Word:</span>
              <span>
                <Chip label={item["translatedWord"]} color="primary" variant="outlined" />
              </span>
            </div>
            <div>Definition:</div>
            <div>
              <ol>
                {item["definition"].map((item) => {
                  return <li> {item} </li>;
                })}
              </ol>
            </div>
            {item["synonyms"].length > 0 ? (
              <div style={{marginBottom: '5px'}}>
                <span style={{ marginRight: "5px" }}>Synonyms:</span>
                <span>
                  {item["synonyms"].map((item) => {
                    return (
                      <Chip
                        label={item}
                        color="success"
                        variant="outlined"
                        style={{ marginRight: "5px" }}
                      />
                    );
                  })}
                </span>
              </div>
            ) : (
              <></>
            )}
            {item["antonyms"].length > 0 ? (
              <div>
                <span style={{ marginRight: "5px" }}>Antonyms:</span>
                <span>
                  {item["antonyms"].map((item) => {
                    return (
                      <Chip
                        label={item}
                        color="error"
                        variant="outlined"
                        style={{ marginRight: "5px" }}
                      />
                    );
                  })}
                </span>
              </div>
            ) : (
              <></>
            )}
            {item["example"].length > 0 ? (
              <div style={{marginBottom: '5px'}}>
                <span style={{ marginRight: "5px" }}>Example:</span>
                <ul>
                  {item["example"].map((item) => {
                    return (
                      <li>{item}</li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </>
          <br />
          <Divider />
        </Typography>
      );
    });
    console.log("HERE");
    console.log(typeof renderData);
    setIsKeywordLoading(false);
    setVocabContent(renderData);
  };

  useEffect(() => {
    fetchChp();
    fetchVocab();
  }, []);

  return (
    <div>
      <Header></Header>
      <br />
      <div className={classes.vocabdevelopment}>
        <Paper elevation={3} style={{ width: "100%" }}>
          <Box p={1.5} className={classes.bluecolor}>
            <Typography
              variant="h4"
              style={{ textAlign: "left", color: "white" }}
            >
              Chapter Details
            </Typography>
            <br />
            <Paper elevation={2}>
              <Typography style={{ textAlign: "left", padding: 10 }}>
                {isChapterLoading ? <LoadingSpinner /> : chapterContent}
              </Typography>
            </Paper>
            <br />
            <Typography
              variant="h4"
              style={{ textAlign: "left", color: "white" }}
            >
              Vocabulary Development
            </Typography>
            <br />
            <Paper elevation={2}>
              <Typography style={{ textAlign: "left", padding: 10 }}>
                {isVocabContentLoading ? <LoadingSpinner /> : vocabContent}
              </Typography>
            </Paper>
          </Box>
          <br />
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              justifyContent: "right",
              paddingRight: 30,
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                className={classes.bluecolorcpy}
                onClick={() => {
                  navigate("/home");
                }}
              >
                BACK
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={classes.bluecolorcpy}
                onClick={handleSubmit}
              >
                PROCEED
              </Button>
            </Grid>
          </Grid>
          <br />
        </Paper>
      </div>
      <div>
        <br />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default VocabDevComp;
