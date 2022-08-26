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
import Carousel from "better-react-carousel";
import "react-multi-carousel/lib/styles.css"

import Button from "@material-ui/core/Button";
import * as con from "../constants";


import Navbar from "./common/Navbar";
import HomePageCard from "./Carousel/HomePageCard"
import GameSection from "./GameSection/GameSection"
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import HomePageChat from "./HomepageChat/HomePageChat";

import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  homepage: {
    // display: "flex",
    width: '100%',
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
  const userId = localStorage.getItem('userId')

  const [chapterContent, setChapterContent] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  const handleSubmit = async (item) => {
    console.log(item);
    const response = await fetch(con.BASE_URI + "/chapter/" + item.id);
    const data = response.json()
    navigate("/vocabdev", { state: { id: data } });
  };

  const fetchChps = async () => {
    setIsChapterLoading(true);
    const response = await fetch(con.BASE_URI + "/chapters?userId=" + userId);
    const data = await response.json();    
    let carouselItem = data['chapterInfo'].map((item) => {
      return (
        <Carousel.Item>
          <div className="card border border-0 shadow mt-3 mb-5 ms-3">
            <div className="d-flex align-items-center justify-content-center">
              <img src={"https://www.productleadership.com/wp-content/uploads/2018/06/Data-Science1-1024x778.png"} className="card-img-top img-fluid mt-3 border border-0 " alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p class="card-text"><small class="text-muted">26th August 2022</small></p>
              <p className="card-text">{item.content.slice(0, 100) + "..."}</p>
              <a href="/vocabdev" className="btn btn-outline-primary" onClick={() => handleSubmit(item)}>Learn</a>
            </div>
          </div>
        </Carousel.Item>
      );
    });
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

      <div className={"container-fluid my-5"}>
        <h1 className="text-center display-4 fw-bold">MY CHAPTERS</h1>
        <div>
          {isChapterLoading ? (
            <LoadingSpinner />
          ) : (
            <Carousel mobileBreakpoint={500} responsive={responsive} cols={4} rows={1} gap={20} loop>
              {chapterContent}
            </Carousel>
          )}
        </div>
        <div className="d-grid gap-2 col-3 mx-auto">
          <button type="button" class="btn btn-primary btn-lg" onClick={() => { navigate("/addchapter"); }}>ADD CHAPTER</button>
        </div>
      </div>

      {/* ================================================================== */}

      <HomePageChat />
      {/* ================================================================== */}

      {/* Games */}


      <div className={"container-fluid mt-5"}>
        <h1 className="text-center display-4 fw-bold">ACTIVITIES</h1>
        <GameSection />
      </div>

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
