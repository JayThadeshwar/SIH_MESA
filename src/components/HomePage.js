import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LoadingSpinner from "../utility/LoadingSpinner";
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Footer from "./common/Footer";
import head from "../images/Home.png";
import carouselCardImg from "../images/chapterImg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"

import Button from "@material-ui/core/Button";
import * as con from "../constants";


import Navbar from "./common/Navbar";
import HomePageCard from "./Carousel/HomePageCard"
import GameSection from "./GameSection/GameSection"
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2



const useStyles = makeStyles((theme) => ({
  homepage: {
    display: "flex",
    "& > *": {},
  },
  bluecolor: {
    backgroundColor: "white",
    padding: 30,
  },
  bluecolorcpy: {
    backgroundColor: lightblue[300],
    fontSize: 25,
  },
  bluecolorcpy1: {
    backgroundColor: lightblue[300],
    fontSize: 15,
  },
  appb: {
    backgroundColor: lightblue[300],
  },
  study: {
    width: "100%",
  },
}));

function Homepage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [chapterContent, setChapterContent] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  const handleSubmit = (chpId) => {
    console.log(chpId);
    navigate("/vocabdev", { state: { id: chpId } });
  };

  const fetchChps = async () => {
    setIsChapterLoading(true);
    console.log(con.BASE_URI + "/chapters");
    const response = await fetch(con.BASE_URI + "/chapters");
    const data = await response.json();
      let carouselItem = data.map((item, key) => {                  
          
            <HomePageCard key={key} title={item["name"]} date={""}  img={carouselCardImg} description={item.content} routeLink={""} downloadLink={""} />                            
      }
          );
          setIsChapterLoading(false);
          setChapterContent(carouselItem);
    

  };

  const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

  useEffect(() => {
    fetchChps();
  }, []);

  return (
    <div>

      {/* ================================================================== */}
      <Navbar />

      {/* ================================================================== */}


      {/* Banner */}


      <div>
        <center>
          {/* <img src={head} alt="tp" className={classes.study}></img> */}          
        </center>
      </div>
      

      {/* ================================================================== */}

      {/* Card Carousel */}

      <div className={classes.homepage}>
        
        {/* <Paper elevation={3} style={{}}> */}
          <Box p={0} className={classes.bluecolor}>
            <Typography
              variant="h4"
              style={{
                textAlign: "left",
                color: "black",
                paddingLeft: 35,
                fontFamily: "fantasy",
              }}
            >
              CHAPTERS
            </Typography>
            <br />

            {isChapterLoading ? (
              <LoadingSpinner />
            ) : (
              
              // <Carousel cols={6} rows={1} gap={1} loop>
               
              <Carousel responsive={responsive}>
                {
                  chapterContent                  
                }            
              </Carousel>
                
              // </Carousel>
            )}
            <br />
          </Box>

          <br />
          {/* <Grid
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
                  navigate("/addchapter");
                }}
              >
                ADD CHAPTER
              </Button>
            </Grid>
          </Grid> */}        

      </div>

      {/* ================================================================== */}

      {/* Games */}

          <GameSection></GameSection>
          {/* <Grid container spacing={0}>
            <Grid xs={12} s={12} md={6} lg={6} xl={6}>Image</Grid>
            <Grid xs={0} s={0} md={6} lg={6} xl={6}>Description</Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid xs={0} s={0} md={6} lg={6} xl={6}>Description</Grid>
            <Grid xs={12} s={12} md={6} lg={6} xl={6}>Image</Grid>
          </Grid> */}
      {/* ================================================================== */}

      {/* Footer */}
      <div>
        <br />
        <Footer />
      </div>

      {/* ================================================================== */}
    </div>
  );
}

export default Homepage;
