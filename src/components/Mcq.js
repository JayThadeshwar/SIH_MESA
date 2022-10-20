import React from 'react';
import cx from "classnames";
import styles from "./Mcq.module.scss";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CorrectTick from '../images/correctTick.png';
import WrongTick from '../images/wrongTick.png';

const Mcq = () => {

  const location = useLocation();
  const chpInfo = location.state.id
  const [data, setData] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [quesArray, setQuesArray] = useState([]);
  const [ansArray, setAnsArray] = useState([]);
  const [answersArray, setAnswersArray] = useState([]);
  const [resArray, setResArray] = useState([]);
  const [finalQues, setFinalQues] = useState([]);
  const [done, setDone] = useState(true);

  const getMcqData = async () => {    
    setData(chpInfo["mcq"])
  }

  useEffect(() => {
    getMcqData();
  }, []);

  useEffect(() => {
    if (data != null && Object.keys(data).length !== 0) {
      if (data != null) {
        setQuesArray(Object.keys(data));
        setAnsArray(Object.values(data))
      }
    }
  }, [data]);

  useEffect(() => {
    if(ansArray.length !== 0){
      let answers = [];
      ansArray.forEach((element) => {
        answers.push(element[0]);
      });
      setAnswersArray(answers);
      setResArray(new Array(answers.length).fill(false));
    }
  }, [ansArray])

  useEffect(() => {
    if (done && resArray.length !== 0) {
      setDone(false);
      let finQ = [];
      for (let i = 0; i < quesArray.length; i++) {
        let chkEle = ansArray[i].sort(() => Math.random() - 0.5).map((ans, keyAns) => {
          return (
            <div class="form-check">
              <input class="form-check-input" type="radio" name={"flexRadioDefault" + i} id={"flexRadioDefault" + keyAns} onClick={() => handleOptionSel(i, ans)} />
              <label class="form-check-label" for={"flexRadioDefault" + keyAns} style={{ "font-weight": "500" }}>
                {ans}
              </label>
            </div>
          )
        });
        finQ.push(chkEle);
      }
      setFinalQues(finQ);      
    }
  }, [resArray])

  // let questionArr = [], ansArr = [], answers = [];
  // if (data != null) {
  //   questionArr = Object.keys(data);
  //   ansArr = Object.values(data);
  //   ansArr.forEach((element) => {
  //     answers.push(element[0])
  //   });
  // }
  // let result = new Array(answers.length).fill(false)
  const navigate = useNavigate();

  function handleOptionSel(key, selAns) {    
    if (answersArray[key] === selAns)
      resArray[key] = true
    else
      resArray[key] = false
    setResArray(resArray)    
  }

  return (
    <div className={cx('container', styles.assessment)}>
      {
        quesArray.length === 0
          ?
          <>
            <h1 className="display-4 mt-5 mb-5" style={{ "fontWeight": "900", color: "#383A3D" }}>No questions available for this chapter.</h1>
            <div className='my-5 text-end'>
              <button type="button" class="btn btn-primary btn-lg" onClick={() => navigate('/home')}>End Chapter</button>
            </div>
          </>
          :
          <>
            <h1 className="display-4 mt-5 mb-3" style={{ "fontWeight": "900", color: "#383A3D" }}>Let's Assess!</h1>

            <div
              className={cx("row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 my-3 mb-5")}
            >

              {quesArray.map((item, key) => {

                return (
                  <div className={cx("cols mt-5 d-flex flex-column gap-1", styles.qnCard)}>
                    <h4 className="fw-bolder">Question {key + 1}:</h4>
                    <span className={"w-75"} style={{ "font-weight": "500" }}>{item}</span>
                    <div className={"d-flex gap-5"}>
                      <div className={"d-flex flex-column"}>
                        {
                          finalQues[key]
                        }
                      </div>
                      {
                        showAns ? (resArray[key] ?
                          <img src={CorrectTick} height='70' width='70' alt='Result tick' /> :
                          <img src={WrongTick} height='60' width='60' alt='Result tick' />
                        ) :
                          <></>
                      }

                    </div>
                  </div>
                )
              })}
            </div>

            <div className='d-flex flex-row-reverse justify-content-between my-5 text-end'>
              <button type="button" class="btn btn-primary btn-lg" onClick={() => navigate('/home')}>End Chapter</button>
              <button type="button" class="btn btn-primary btn-lg" onClick={() => setShowAns(true)}>Evaluate</button>
            </div>
          </>
      }
    </div>
  )
}

export default Mcq