// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Box from "@material-ui/core/Box";
// import blue from "@material-ui/core/colors/blue";
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import red from "@material-ui/core/colors/red";
// import CorrectTick from '../images/correctTick.png';
// import WrongTick from '../images/wrongTick.png';
// import lightblue from "@material-ui/core/colors/lightBlue";

// const useStyles = makeStyles((theme) => ({
//   evaluationpaper: {
//     display: 'flex',    
//     '& > *': {
//       backgroundColor: blue[50],
//     },
//   },
//   orangecolor: {
//     color: red[500],
//   },
//   bluecolor: {
//     backgroundColor: lightblue[300],
//     padding: 30
// },
// }));


// function SelfEvalComp() {

//   const classes = useStyles();
//   const navigate = useNavigate();
//   const [value1, setValue1] = React.useState('');
//   const [value2, setValue2] = React.useState('');
//   const [value3, setValue3] = React.useState('');
//   const [value4, setValue4] = React.useState('');
//   const [helperText1, setHelperText1] = React.useState('');
//   const [helperText2, setHelperText2] = React.useState('');
//   const [helperText3, setHelperText3] = React.useState('');
//   const [helperText4, setHelperText4] = React.useState('');
//   const [textcolor, setTextColor] = React.useState();

//   const handleChange1 = (event, newVal) => {
//     setValue1(newVal);
//   };
//   const handleChange2 = (event, newVal) => {
//     setValue2(newVal);
//   };
//   const handleChange3 = (event, newVal) => {
//     setValue3(newVal);
//   };
//   const handleChange4 = (event, newVal) => {
//     setValue4(newVal);
//   };

//     const handlenext = (event) => {
//         event.preventDefault();
//         navigate("/home");
//     };
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (value1 === 'barium') {
//       setHelperText1(CorrectTick);
//     } else {
//       setHelperText1(WrongTick);
//       setTextColor('#76ff03');
//     }

//     if (value2 === 'copper') {
//       setHelperText2(CorrectTick);
//     } else {
//       setHelperText2(WrongTick);
//       setTextColor('#76ff03');
//     }

//     if (value3 === 'aluminum') {
//       setHelperText3(CorrectTick);
//     } else {
//       setHelperText3(WrongTick);
//       setTextColor('#76ff03');
//     }

//     if (value4 === 'barium') {
//       setHelperText4(CorrectTick);
//     } else {
//       setHelperText4(WrongTick);
//       setTextColor('#76ff03');
//     }
//   };

//   const handleClear = (event) => {
//     setValue1('');
//     setValue2('');
//     setValue3('');
//     setValue4('');
//     setHelperText1('');
//     setHelperText2('');
//     setHelperText3('');
//     setHelperText4('');
//     setTextColor('');
//   };

//   return (
//     <div className={classes.evaluationpaper}>
//       <Paper elevation={3}>
//         <Box p={1.5} className={classes.bluecolor}>
//           <Typography variant="h4" style={{ textAlign: 'left' , color:'white'}}>
//             Assessment
//           </Typography><br/>
//           <br />
//           <Grid container spacing={3}>

//             <Grid item xs={12}>
//               <Paper elevation={2} className={classes.questionpaper}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                   <Box p={1.5}>
//                     <FormControl component="fieldset">
//                       <Typography variant="h6">1) Chhatrapati _________ Maharaj was born on February 19, 1630, on Shivneri Fort in Junnar Taluka, Pune district of Maharashtra, India.</Typography>
//                       <RadioGroup aria-label="q1" name="q1" value={value1} onChange={handleChange1}>
//                         <FormControlLabel value="barium" style={{ color: textcolor }} control={<Radio />} label="Shivaji" />
//                         <FormControlLabel value="copper" control={<Radio />} label="Sambhaji" />
//                         <FormControlLabel value="aluminum" control={<Radio />} label="Gandhiji" />
//                         <FormControlLabel value="hydrogen" control={<Radio />} label="Tanaji" />
//                       </RadioGroup>
//                     </FormControl>
//                   </Box>
//                   <div style={{
//                     alignSelf: 'center',
//                     flex: '3',
//                     textAlign: 'center'
//                   }}>
//                     {helperText1 !== '' && (
//                       <img src={helperText1} height='80' width='80' alt='Result tick' />
//                     )
//                     }
//                   </div>
//                 </div>
//               </Paper>
//             </Grid>

//             <Grid item xs={12}>
//               <Paper elevation={2} className={classes.questionpaper}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                   <Box p={1.5}>
//                     <FormControl component="fieldset">
//                       <Typography variant="h6">2) Watan meant a piece of _______ comprising of a village or villages assigned to a person for performing certain duties.</Typography>
//                       <RadioGroup aria-label="q1" name="q1" value={value2} onChange={handleChange2}>
//                         <FormControlLabel value="barium"  control={<Radio />} label="region" />
//                         <FormControlLabel value="copper" style={{ color: textcolor }} control={<Radio />} label="land" />
//                         <FormControlLabel value="aluminum" control={<Radio />} label="place" />
//                         <FormControlLabel value="hydrogen" control={<Radio />} label="area" />
//                       </RadioGroup>
//                     </FormControl>
//                   </Box>
//                   <div style={{
//                     alignSelf: 'center',
//                     flex: '3',
//                     textAlign: 'center'
//                   }}>
//                     {helperText2 !== '' && (
//                       <img src={helperText2} height='80' width='80' alt='Result tick' />
//                     )
//                     }
//                   </div>
//                 </div>
//               </Paper>
//             </Grid>

//             <Grid item xs={12}>
//               <Paper elevation={2} className={classes.questionpaper}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                   <Box p={1.5}>
//                     <FormControl component="fieldset">
//                       <Typography variant="h6">3) _______________ was under the rule of 3 major sultanates viz. Adilshah of Bijapur, Nizamshah, and Mughals.</Typography>
//                       <RadioGroup aria-label="q1" name="q1" value={value3} onChange={handleChange3}>
//                         <FormControlLabel value="barium"  control={<Radio />} label="Madhya Pradesh" />
//                         <FormControlLabel value="copper" control={<Radio />} label="Gujarat" />
//                         <FormControlLabel value="aluminum" style={{ color: textcolor }} control={<Radio />} label="Maharashtra" />
//                         <FormControlLabel value="hydrogen" control={<Radio />} label="Goa" />
//                       </RadioGroup>
//                     </FormControl>
//                   </Box>
//                   <div style={{
//                     alignSelf: 'center',
//                     flex: '3',
//                     textAlign: 'center'
//                   }}>
//                     {helperText3 !== '' && (
//                       <img src={helperText3} height='80' width='80' alt='Result tick' />
//                     )
//                     }
//                   </div>
//                 </div>
//               </Paper>
//             </Grid>

//             <Grid item xs={12}>
//               <Paper elevation={2} className={classes.questionpaper}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                   <Box p={1.5}>
//                     <FormControl component="fieldset">
//                       <Typography variant="h6">4) __________ religion was practiced by Shivaji's father.</Typography>
//                       <RadioGroup aria-label="q1" name="q1" value={value4} onChange={handleChange4}>
//                         <FormControlLabel value="barium" style={{ color: textcolor }} control={<Radio />} label="Hindu" />
//                         <FormControlLabel value="copper" control={<Radio />} label="Islam" />
//                         <FormControlLabel value="aluminum" control={<Radio />} label="Jain" />
//                         <FormControlLabel value="hydrogen"  control={<Radio />} label="Christian" />
//                       </RadioGroup>
//                     </FormControl>
//                   </Box>
//                   <div style={{
//                     alignSelf: 'center',
//                     flex: '3',
//                     textAlign: 'center'
//                   }}>
//                     {helperText4 !== '' && (
//                       <img src={helperText4} height='80' width='80' alt='Result tick' />
//                     )
//                     }
//                   </div>
//                 </div>
//               </Paper>
//             </Grid>
//           </Grid>
//           <br />
//           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center' }}>
//             <Grid item>
//               <Button variant="contained" color="primary" onClick={handleSubmit}>
//                 SUBMIT
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" color="primary" onClick={handleClear}>
//                 RESET
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" color="primary" onClick={handlenext}>
//                 END CHAPTER
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </div>
//   );
// }

// export default SelfEvalComp;


import React from 'react';
import cx from "classnames";
import styles from "./Mcq.module.scss";
import { useNavigate } from 'react-router-dom';
const Mcq = () => {

  const data = {
    "Under Louis XVI,  _______  helped the thirteen American colonies to gain their independence from the common enemy, Britain.": [
      "France",
      "Switzerland",
      "Ukraine",
      "Austria-Hungary"
    ],
    "Added to this was the cost of maintaining an extravagant court at the immense palace of  _______ .": [
      "Versailles",
      "Chartres",
      "Avignon",
      "Poitou-Charentes"
    ],
    "In 1774, Louis XVI of the  _______  family of kings ascended the throne of France.": [
      "Bourbon",
      "Basileus",
      "Bourbon",
      "Caliph"
    ],
    "The  _______  too extracted its share of taxes called tithes from the peasant, and finally, all members ofThe third estate had to pay taxes to.": [
      "Church",
      "Chapel Service",
      "Church Service",
      "Committal Service"
    ]
  }

  const questionArr = Object.keys(data);
  const ansArr = Object.values(data);
  const navigate = useNavigate();

  console.log(questionArr, ansArr)
  

  return (
    <div className={cx('container', styles.assessment)}>
      <h1 className="display-4 mt-5 mb-3" style={{ "fontWeight": "900", color: "#383A3D" }}>Let's Assess!</h1>      

      <div        
        className={cx("row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 my-3 mb-5")}
      >

        {questionArr.map((item, key) => {

          return (
            <div className={cx("cols mt-5 d-flex flex-column gap-1", styles.qnCard)}>
              <h4 className="fw-bolder">Question {key + 1}:</h4>
              <span className={"w-75"} style={{"font-weight": "500"}}>{item}</span>
              <div>                
                {                              
                  ansArr[key].sort( ()=>Math.random()-0.5 ).map((ans, keyAns) => {                    
                    return (
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name={"flexRadioDefault"+key} id={"flexRadioDefault"+keyAns} />
                          <label class="form-check-label" for={"flexRadioDefault"+keyAns} style={{"font-weight": "500"}}>
                            {ans}
                          </label>
                      </div>                      
                    )
                })
                }
              </div>
            </div>
          )
        })}
      </div>

        <div className='my-5 text-end'>
      <button type="button" class="btn btn-primary btn-lg" onClick={()=>navigate('/home')}>Submit</button>

        </div>
    </div>
  )
}

export default Mcq