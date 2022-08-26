// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Divider from "@material-ui/core/Divider";
// import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/styles";
// import lightblue from "@material-ui/core/colors/lightBlue";
// import Grid from '@material-ui/core/Grid';
// import Header from "./Header"
// import Footer from "./common/Footer"
// import GmCard from "../utility/GrammarCard";
// import SvoCard from "../utility/SvoCard";
// import LoadingSpinner from "../utility/LoadingSpinner";
// import * as con from '../constants';
// import i18next from 'i18next';
// import {useTranslation} from 'react-i18next';

// const useStyles = makeStyles((theme) => ({
//   grammar: {
//     display: 'flex',
//     '& > *': {
//       //   backgroundColor: blue[50],
//     },
//   },
//   bluecolor: {
//     backgroundColor: lightblue[300],
//     padding: 30
//   },
//   bluecolorcpy: {
//     backgroundColor: lightblue[300],
//   },

// }));


// function GrammaticalAndAssessment() {

//   const {t} = useTranslation()
//   const [grammarUnderstanding, setGrammarUnderstanding] = useState([]);
//   const [svoInfo, setSvoInfo] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const location = useLocation();
//   const chpInfo = location.state.id

//   const classes = useStyles();
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate("/assessment");
//   };

//   const fetchGrammar = async () => {

//     const data = chpInfo['grammarInformation']
//     console.log(data)
//     let renderGrammar = (data["grammarticalInfo"]).map((item) => {
//       return GmCard(item["sentence"], item["noun"], item["adjective"], item["verb"], item["coordinating conjunction"], item["adposition"])
//     });

//     let renderSvo = (data["svoInfo"]).map((item) => {
//       return SvoCard(item["sentence"], item["subject"], item["verb"], item["object"], item["phrase"])
//     });

//     setGrammarUnderstanding(renderGrammar)
//     setSvoInfo(renderSvo)
//   }

//   useEffect(() => {
//     fetchGrammar()
//   }, []);


//   return (
//     <div>
//       <Header></Header><br />
//       <div className={classes.grammar}>

//         <Paper elevation={3} style={{ width: '100%' }}>
//           <Box p={1.5} className={classes.bluecolor}>
//             <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
//               {t("Grammar")}
//             </Typography><br />
//             <Paper elevation={2}>
//               <Typography variant="h6" style={{ textAlign: 'left', padding: 10 }}>
//                 {t("POS")}
//                 <Divider />
//                 {isLoading ? <LoadingSpinner /> : grammarUnderstanding}
//               </Typography>
//             </Paper>
//             <br />
//             <Paper elevation={2}>
//               <Typography variant="h6" style={{ textAlign: 'left', padding: 10 }}>
//                 {t("SVO")}
//                 <Divider />
//                 {isLoading ? <LoadingSpinner /> : svoInfo}
//               </Typography>
//             </Paper>
//             <br />        
//           </Box>
//           <br />
//           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'right', paddingRight: 30 }}>
//             <Grid item>
//               <Button variant="contained" className={classes.bluecolorcpy} onClick={() => { navigate("/summarization"); }}>
//                 {t("Back")}
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" className={classes.bluecolorcpy} onClick={handleSubmit}>
//                 {t("Proceed")}
//               </Button>
//             </Grid>
//           </Grid>
//           <br />
//         </Paper>
//       </div>
//       <div><br />
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// }

// export default GrammaticalAndAssessment;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cx from "classnames";
import styles from "./Grammar.module.scss";
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { useTranslation } from 'react-i18next';
import GmCard from "../utility/GrammarCard";
import SvoCard from "../utility/SvoCard";

const Grammar = () => {
  const { t } = useTranslation()
  const [grammarUnderstanding, setGrammarUnderstanding] = useState([]);
  const [svoInfo, setSvoInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const chpInfo = location.state.id

  // const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/assessment",{ state: { id: chpInfo } });
  };

  const fetchGrammar = async () => {

    const data = chpInfo['grammarInformation']
    console.log(data)

    let renderGrammar = (data["grammarticalInfo"]).map((item, key) => {
      return GmCard(key, item["sentence"], item["noun"], item["adjective"], item["verb"], item["coordinating conjunction"], item["adposition"])
    });

    let renderSvo = (data["svoInfo"]).map((item, key) => {
      return SvoCard(key, item["sentence"], item["subject"], item["verb"], item["object"], item["phrase"])
    });

    setGrammarUnderstanding(renderGrammar)
    setSvoInfo(renderSvo)
  }

  useEffect(() => {
    fetchGrammar()
  }, []);

  return (
    <>
      <Navbar />
      <div className={cx('container-fluid', styles.Grammer)}>
        <h1 className="display-4 mt-5 mb-3" style={{ "fontWeight": "900", color: "#383A3D" }}>
          {t("Grammar")}
        </h1>

        <div className={cx('container-fluid', styles.pos)}>
          <h3 className="display-7 text-capitalize mt-5 mb-3" style={{ "fontWeight": "600", color: "#383A3D" }}>{t("POS")}</h3>

          {grammarUnderstanding}          

        </div>

        <div className={cx('container-fluid', styles.svo)}>
          <h3 className="display-7 text-capitalize mt-5 mb-3" style={{ "fontWeight": "600", color: "#383A3D" }}>{t("SVO")}</h3>

          {svoInfo}
        </div>

        <div className="my-4 text-end">
          <button type="button" class="btn btn-primary btn-lg" onClick={()=>navigate("/assessment")}>PROCEED</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Grammar