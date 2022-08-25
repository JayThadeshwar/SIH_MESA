// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../utility/LoadingSpinner";
// import * as con from "../constants";
// import { useSpeechSynthesis } from 'react-speech-kit';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/styles";
// import lightblue from "@material-ui/core/colors/lightBlue";
// import Grid from "@material-ui/core/Grid";
// import Header from "./Header";
// import Footer from "./common/Footer";
// import Chip from "@mui/material/Chip";
// import Divider from "@material-ui/core/Divider";
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';

// const useStyles = makeStyles((theme) => ({
//   vocabdevelopment: {
//     display: "flex",
//     "& > *": {
//       //   backgroundColor: blue[50],
//     },
//   },
//   clickHover: {
//     "&:hover": {
//       cursor: 'pointer',
//       backgroundColor: '#D4F1F4'
//     }
//   },
//   bluecolor: {
//     backgroundColor: lightblue[300],
//     padding: 30,
//   },
//   bluecolorcpy: {
//     backgroundColor: lightblue[300],
//   },
// }));

// function VocabDevComp() {
//   const [value, setValue] = useState('');
//   const { speak } = useSpeechSynthesis();
//   const location = useLocation();
//   const itemInfo = location.state.id

//   const [chapterContent, setChapterContent] = useState("");
//   const [vocabContent, setVocabContent] = useState([]);
//   const [clickableArr, setclickableArr] = useState([]);
//   const [isChapterLoading, setIsChapterLoading] = useState(false);
//   const [isVocabContentLoading, setIsKeywordLoading] = useState(false);

//   const classes = useStyles();
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate("/summarization", { state: { id: location.state.id } });
//   };

//   const fetchChp = async () => {
//     setChapterContent(itemInfo["content"]);
//   };

//   const fetchVocab = async () => {
//     const data = itemInfo['vocabularyDevelopment'];
//     const renderData = data.map((item) => {
//       if (item["definition"].length <= 0 && item["synonyms"].length <= 0)
//         return <div></div>
//       return (
//         <Typography style={{ textAlign: "left", padding: 10 }}>
//           <>
//             <div>
//               <span style={{ marginRight: "5px" }}>Word:</span>
//               <span>
//                 <Chip label={item["word"]} color="primary" variant="outlined" />
//               </span>
//               {
//                 item["audioLink"].length > 0 ?
//                   (
//                     <span onClick={() => {
//                       const audio = new Audio(item["audioLink"][0]);
//                       audio.play();
//                     }}>
//                       <VolumeUpIcon />
//                     </span>
//                   ) : <></>
//               }
//             </div>
//             <div>
//               <span style={{ marginRight: "5px" }}>Translation of Word:</span>
//               <span>
//                 <Chip label={item["translatedWord"]} color="primary" variant="outlined" />
//               </span>
//             </div>
//             <div>Definition:</div>
//             <div>
//               <ol>
//                 {item["definition"].map((item) => {
//                   return <li> {item} </li>;
//                 })}
//               </ol>
//             </div>
//             {item["synonyms"].length > 0 ? (
//               <div style={{ marginBottom: '5px' }}>
//                 <span style={{ marginRight: "5px" }}>Synonyms:</span>
//                 <span>
//                   {item["synonyms"].map((item) => {
//                     return (
//                       <Chip
//                         label={item}
//                         color="success"
//                         variant="outlined"
//                         style={{ marginRight: "5px" }}
//                       />
//                     );
//                   })}
//                 </span>
//               </div>
//             ) : (
//               <></>
//             )}
//             {item["antonyms"].length > 0 ? (
//               <div>
//                 <span style={{ marginRight: "5px" }}>Antonyms:</span>
//                 <span>
//                   {item["antonyms"].map((item) => {
//                     return (
//                       <Chip
//                         label={item}
//                         color="error"
//                         variant="outlined"
//                         style={{ marginRight: "5px" }}
//                       />
//                     );
//                   })}
//                 </span>
//               </div>
//             ) : (
//               <></>
//             )}
//             {item["example"].length > 0 ? (
//               <div style={{ marginBottom: '5px' }}>
//                 <span style={{ marginRight: "5px" }}>Example:</span>
//                 <ul>
//                   {item["example"].map((item) => {
//                     return (
//                       <li>{item}</li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             ) : (
//               <></>
//             )}
//           </>
//           <br />
//           <Divider />
//         </Typography>
//       );
//     });
//     setVocabContent(renderData);
//   }

//   useEffect(() => {
//     setclickableArr(itemInfo["content"].split('.'))
//     fetchChp();
//     fetchVocab();
//   }, []);

//   return (
//     <div>
//       <Header></Header>
//       <br />
//       <div className={classes.vocabdevelopment}>
//         <Paper elevation={3} style={{ width: "100%" }}>
//           <Box p={1.5} className={classes.bluecolor}>
//             <Typography
//               variant="h4"
//               style={{ textAlign: "left", color: "white" }}
//             >
//               Chapter Details
//             </Typography>
//             <br />
//             <Paper elevation={2}>
//               <Typography style={{ textAlign: "left", padding: 10 }}>


//                 {/* =========== Chapter Details*/}
//                 {isChapterLoading && clickableArr.length !== 0 ? <LoadingSpinner /> : clickableArr.map((item) => {
//                   return <span id='clickHover' className={classes.clickHover} onClick={() => speak({ text: item })}>{item + ". "}</span>
//                 })}
//               </Typography>
//             </Paper>
//             <br />
//             <Typography
//               variant="h4"
//               style={{ textAlign: "left", color: "white" }}
//             >
//               Vocabulary Development
//             </Typography>
//             <br />
//             <Paper elevation={2}>
//               <Typography style={{ textAlign: "left", padding: 10 }}>
//                 {isVocabContentLoading ? <LoadingSpinner /> : vocabContent}
//               </Typography>
//             </Paper>
//           </Box>
//           <br />
//           <Grid
//             container
//             spacing={3}
//             style={{
//               display: "flex",
//               justifyContent: "right",
//               paddingRight: 30,
//             }}
//           >
//             <Grid item>
//               <Button
//                 variant="contained"
//                 className={classes.bluecolorcpy}
//                 onClick={() => {
//                   navigate("/home");
//                 }}
//               >
//                 BACK
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 className={classes.bluecolorcpy}
//                 onClick={handleSubmit}
//               >
//                 PROCEED
//               </Button>
//             </Grid>
//           </Grid>
//           <br />
//         </Paper>
//       </div>
//       <div>
//         <br />
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// }

// export default VocabDevComp;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utility/LoadingSpinner";
import * as con from "../constants";
import { useSpeechSynthesis } from 'react-speech-kit';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import styles from "./VocabularyDevelopment.module.scss";
import lightblue from "@material-ui/core/colors/lightBlue";
import { makeStyles } from "@material-ui/styles";
import cx from "classnames";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const useStyles = makeStyles((theme) => ({
  vocabdevelopment: {
    display: "flex",
    "& > *": {
      //   backgroundColor: blue[50],
    },
  },
  clickHover: {
    "&:hover": {
      cursor: 'pointer',
      backgroundColor: '#f381a7'
    }
  },
  bluecolor: {
    backgroundColor: lightblue[300],
    padding: 30,
  },
  bluecolorcpy: {
    backgroundColor: lightblue[300],
  },
}));

const VocabularyDevelopment = () => {

  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();
  const location = useLocation();
  const itemInfo = location.state.id

  const [chapterContent, setChapterContent] = useState("");
  const [vocabContent, setVocabContent] = useState([]);
  const [clickableArr, setclickableArr] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);
  const [isVocabContentLoading, setIsKeywordLoading] = useState(false);

  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/summarization", { state: { id: location.state.id } });
  };

  const fetchChp = async () => {
    setChapterContent(itemInfo["content"]);
  };


  const fetchVocab = async () => {

    const data = itemInfo['vocabularyDevelopment'];

    const generateRandom = () => {
      const capsuleColor = ["bg-primary text-light", "bg-secondary text-light", "bg-success text-light", "bg-danger text-light", "bg-warning text-dark", "bg-info text-dark",
      ]

      return (capsuleColor[Math.floor(Math.random() * capsuleColor.length)])

    }
    const renderData = data.map((item, key) => (
      <>
        <div className={cx("accordion accordion", styles.acc)} id="accordionFlushExample">

          <div className="accordion-item mt-3">
            <h2 className="accordion-header" id={"flush-heading" + key}>
              <button
                className={cx("accordion-button collapsed text-capitalize", styles.accBtn)} type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + key} aria-expanded="false" aria-controls={"flush-collapse" + key}>
                {item.word}
              </button>
            </h2>
            <div id={"flush-collapse" + key} className="accordion-collapse collapse" aria-labelledby={"flush-heading" + key} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <div className="container-fluid d-flex flex-column gap-3">
                  <div className="row">

                    <div className="d-flex align-items-center gap-3">
                      <h1>
                        <span onClick={() => {
                          const audio = new Audio(item["audioLink"][0]);
                          audio.play();
                        }}><VolumeUpIcon /></span> {item.word}:
                      </h1>
                      <h3>
                        {item.translatedWord}
                      </h3>
                    </div>
                  </div>

                  <div className="row">
                    {
                      item.definition.length === 0 ? null :
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                          <h5>Definitions: </h5>
                          <ol className="list-group list-group-numbered">
                            {item.definition.map((item, key) => (
                              <li className="list-group-item" key={key}>
                                {item.split('[')[0]} {'=>'} {item.split('[')[1].slice(0, -1)}
                                {/* {item} */}
                              </li>
                            )
                            )}
                          </ol>
                        </div>
                    }

                    {
                      item.example.length === 0 ? null :
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <h5>Examples: </h5>
                          <ul className="d-flex flex-column gap-2">
                            {item.example.map((item, key) => (
                              <li className="" key={key}>{item}</li>
                            ))}
                          </ul>
                        </div>
                    }

                  </div>

                  {item.synonyms.length === 0 ? null :
                    <div>
                      <h5>Synonyms: </h5>
                      <div className="d-flex gap-3 flex-wrap">
                        {item.synonyms.map((item, key) => (<span className={cx("p-2 shadow", styles.capSule, `${generateRandom()}`)} key={key}>{item}</span>))}
                      </div>
                    </div>
                  }

                  {item.antonyms.length === 0 ? null :
                    <div>
                      <h5>Antonyms: </h5>
                      <div className="d-flex gap-3 flex-wrap">
                        {item.antonyms.map((item, key) => (<span className={cx("p-2 shadow", styles.capSule, `${generateRandom()}`)} key={key}>{item}</span>))}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ))
    setVocabContent(renderData);
  }

  useEffect(() => {
    setclickableArr(itemInfo["content"].split('.'))
    fetchChp();
    fetchVocab();
  }, []);


  return (
    <div className={cx("VocabDev", styles.vocabDev)}>
      <Navbar />
      <div className={cx("container-fluid p-5", styles.topVocabDev)}>
        <h1 className={"title"}>Chapter Details</h1>
        <div className={cx(styles.chapDetail, "")}>
          {isChapterLoading && clickableArr.length !== 0 ? <LoadingSpinner /> : clickableArr.map((item) => {
            return <span id='clickHover' className={classes.clickHover} onClick={() => speak({ text: item })}>{item + ". "}</span>
          })}
        </div>
      </div>



      <div className={cx("container-fluid p-5", styles.bottomVocabDev)}>
        <h1 className={"title"}>Vocabulary Development</h1>
        <div className={cx(styles.bottomVocabDet, "")}>


          {isVocabContentLoading ? <LoadingSpinner /> : vocabContent}


        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VocabularyDevelopment