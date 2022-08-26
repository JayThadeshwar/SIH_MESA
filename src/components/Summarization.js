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
import styles from "./Summarization.module.scss";
import cx from "classnames";

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

  const data = [
    { title: 'Summarization', keyword: "summary" },
    { title: 'Translation', keyword: "translation" },
  ]

  return (
    <div>
      <Navbar />
      <div className="summarisation">

        <div className="container d-flex flex-column gap-2">

          <h1 className="display-4 text-start mt-5 mb-3" style={{ "fontWeight": "900", color: "#383A3D" }}>Summarization</h1>

          <div className="row">

            {
              data.map((item, key) => (
                <>
                  <div className={cx("col-lg-6 col-md-6 col-sm-12 col-xs-12", styles.responsiveDiv)}>
                    <label for="exampleFormControlTextarea2" className={cx("form-label fs-3 rounded p-2", styles.title)}>{item.title}</label>
                    <textarea className={cx("form-control border border-0", styles.textArea)} id="exampleFormControlTextarea2" value={stContent[item.keyword]} rows="12">
                      {
                        isLoading ? <LoadingSpinner /> : ''
                      }
                    </textarea>

                  </div>
                </>
              ))
            }
            
          </div>
          <div className="my-3 mt-4 d-flex gap-3 justify-content-end">
            <button type="button" className="btn btn-outline-dark btn-lg" onClick={() => { navigate("/vocabdev"); }}>Back</button>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Proceed</button>
          </div>

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default SummarizeAndTranslate;