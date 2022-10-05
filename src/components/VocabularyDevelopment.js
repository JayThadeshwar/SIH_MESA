import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utility/LoadingSpinner";
import * as con from "../constants";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";
import styles from "./VocabularyDevelopment.module.scss";
import lightblue from "@material-ui/core/colors/lightBlue";
import { makeStyles } from "@material-ui/styles";
import cx from "classnames";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import io from 'socket.io-client';
import playOutput from "./common/PlayAudio";
import voiceApiFunction from "./common/voiceApiFunction";

const socketio = io.connect("http://localhost:5001");

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
  const location = useLocation();
  const chpId = location.state.id;

  const [chapterContent, setChapterContent] = useState("");
  const [vocabContent, setVocabContent] = useState([]);
  const [chpData, setChpData] = useState({});
  const [clickableArr, setclickableArr] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);
  const [isVocabContentLoading, setIsKeywordLoading] = useState(false);

  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/summarization", { state: { id: chpData } });
  };

  const fetchData = async () => {
    const chapterDetails = await fetch(con.BASE_URI + '/chapter/' + chpId);
    const chpDet = await chapterDetails.json();
    setChpData(chpDet)
  };

  useEffect(() => {

    socketio.on('connect', function () {
      console.log('connected')
    });
    socketio.on('results-tts', function (data) {
      playOutput(data);
    });
    if (Object.keys(chpData).length !== 0) {
      fetchChp();
      fetchVocab();
      setclickableArr(chpData["content"].split('.'))
    }
  }, [chpData]);

  const fetchChp = async () => {
    setChapterContent(chpData['content']);
  };
  const fetchVocab = async () => {
    const data = chpData['vocabularyDevelopment'];
    console.log("Data:" + data)
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
                          console.log(item.word)
                          let payload = voiceApiFunction.voicePostFunction()
                          payload['text'] = item.word
                          socketio.emit('tts-message', payload)
                          // const audio = new Audio(item["audioLink"][0]);
                          // audio.play();
                        }}><VolumeUpIcon /></span> {item.word}:
                      </h1>
                      <h3>
                        {item.translatedWord['hi']}
                      </h3>
                    </div>
                  </div>

                  <div className="row">
                    {
                      item.definition.length === 0 ? null :
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                          <h5>Definitions: </h5>
                          <ol className="list-group list-group-numbered">
                            {item.definition['hi'].map((item, key) => (
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
    fetchData();
  }, []);


  return (
    <div className={cx("VocabDev", styles.vocabDev)}>
      <Navbar />
      <div className={cx("container-fluid p-5", styles.topVocabDev)}>
        <h1 className={"title"}>Chapter Details</h1>
        <div className={cx(styles.chapDetail, "")}>
          {isChapterLoading && clickableArr.length !== 0 ? <LoadingSpinner /> : clickableArr.map((item) => {
            return <span id='clickHover' className={classes.clickHover} onClick={() => {
              let payload = voiceApiFunction.voicePostFunction()
              payload['text'] = item
              socketio.emit('tts-message', payload)
            }}>{item + ". "}</span>
          })}
        </div>
      </div>



      <div className={cx("container-fluid p-5", styles.bottomVocabDev)}>
        <h1 className={"title"}>Vocabulary Development</h1>
        <div className={cx(styles.bottomVocabDet, "")}>


          {isVocabContentLoading ? <LoadingSpinner /> : vocabContent}


        </div>
      </div>

      <div className={cx("container text-center mb-5 btn-lg")}>
        <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>NEXT</button>
      </div>
      <Footer />
    </div>
  )
}

export default VocabularyDevelopment