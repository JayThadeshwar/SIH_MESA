// import React from "react";

// export default function McqQues {
//     return (
//     <Grid item xs={12}>
//     <Paper elevation={2} className={classes.questionpaper}>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <Box p={1.5}>
//           <FormControl component="fieldset">
//             <Typography variant="h6">2) Which of the following statement(s) is (are) correct?
//               <br />(i) Bulb will not glow because electrolyte is not acidic.
//               <br />(ii) Bulb will glow because HCl is a strong acid and furnishes ions for conduction.
//               <br />(iii) Bulb will not glow because circuit is incomplete.
//               <br />(iv) Bulb will not glow because it depends upon the type of electrolytic solution.
//             </Typography>

//             <RadioGroup aria-label="q2" name="q2" value={value2} onChange={handleChange2}>
//               <FormControlLabel value="a1" control={<Radio />} label="(i) and (iii)" />
//               <FormControlLabel value="b1" control={<Radio />} label="(ii) and (iv)" />
//               <FormControlLabel value="c1" style={{ color: textcolor }} control={<Radio />} label="(ii) only" />
//               <FormControlLabel value="d1" control={<Radio />} label="(iv) only" />
//             </RadioGroup>

//           </FormControl>
//         </Box>
//         <div style={{
//           alignSelf: 'center',
//           flex: '3',
//           textAlign: 'center'
//         }}>
//           {helperText2 !== '' && (
//             <img src={helperText2} height='80' width='80' alt='Result tick' />
//           )
//           }
//         </div>
//       </div>
//     </Paper>
//   </Grid>);
// }