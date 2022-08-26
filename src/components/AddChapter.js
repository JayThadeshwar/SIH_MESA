// // import React, { useState } from "react";
// // import { useNavigate } from 'react-router-dom';
// // import Button from '@material-ui/core/Button';
// // import Typography from '@material-ui/core/Typography';
// // import Paper from '@material-ui/core/Paper';
// // import Alert from '@mui/material/Alert';
// // import Box from "@material-ui/core/Box";
// // import { makeStyles } from "@material-ui/styles";
// // import lightblue from "@material-ui/core/colors/lightBlue";
// // import Grid from '@material-ui/core/Grid';
// // import Header from "./Header";
// // import Footer from "./common/Footer";
// // import TextField from '@mui/material/TextField';
// // import * as con from '../constants'
// // import Navbar from "./common/Navbar";

// // const useStyles = makeStyles((theme) => ({
// //   addchap: {
// //     display: 'flex',
// //     '& > *': {
// //       //   backgroundColor: blue[50],
// //     },
// //   },
// //   bluecolor: {
// //     backgroundColor: lightblue[300],
// //     padding: 30
// //   },
// //   bluecolorcpy: {
// //     backgroundColor: lightblue[300],
// //   },

// // }));


// // function AddStudyChapter() {
// //   const classes = useStyles();
// //   const navigate = useNavigate();

// //   const [values, setValues] = React.useState({
// //     name: '',
// //     content: ''
// //   });

// //   const [hasErr, sethasErr] = useState(false);

// //   const handleChangeForm = name => event => {
// //     setValues({ ...values, [name]: event.target.value });
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     const requestOptions = {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         name: values.name,
// //         content: values.content
// //       })
// //     };
// //     fetch(con.BASE_URI + "/chapters", requestOptions)
// //       .then(response => {
// //         console.log(response)
// //         if (response.status === 201)
// //           navigate("/home");
// //         else
// //           sethasErr(true)
// //       }).catch(err => {
// //         console.log(err)
// //         sethasErr(true)
// //       })

// //   };

// //   return (

// //     <>

// //     <div>
// //     <Navbar/>
// //         </div>

// //     <div>

// //       {hasErr ? 
// //       <>
// //       <Alert severity="error">
// //         Unable to add chapter, please try again.
// //       </Alert><br/>
// //       </>
// //       : <></>}


// //       <div className={classes.addchap}>

// //         <Paper elevation={3} style={{ width: '100%' }}>
// //           <Box p={1.5} className={classes.bluecolor}>
// //             <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
// //               Chapter Name
// //             </Typography><br />
// //             <Paper elevation={2}>
// //               <TextField onChange={handleChangeForm("name")} id="outlined-basic" placeholder='Enter Chapter Name' variant="outlined" style={{ width: '100%' }} />
// //             </Paper>
// //             <br />
// //             <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
// //               Chapter Data
// //             </Typography><br />
// //             <Paper elevation={2}>
// //               <TextField onChange={handleChangeForm("content")} id="outlined-multiline-static" multiline rows={10} placeholder="Enter Chapter's Content" style={{ width: '100%' }} />
// //             </Paper>
// //           </Box>
// //           <br />
// //           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'right', paddingRight: 30 }}>
// //             <Grid item>
// //               <Button variant="contained" className={classes.bluecolorcpy} onClick={() => { navigate("/home"); }}>
// //                 BACK
// //               </Button>
// //             </Grid>
// //             <Grid item>
// //               <Button variant="contained" className={classes.bluecolorcpy} onClick={handleSubmit}>
// //                 ADD CHAPTER
// //               </Button>
// //             </Grid>
// //           </Grid>
// //           <br />
// //         </Paper>
// //       </div>
// //       <div><br />
// //         <Footer></Footer>
// //       </div>
// //     </div>
// //     </>
// //   );
// // }

// // export default AddStudyChapter;

// import React, { useState } from 'react'
// import Footer from './common/Footer'
// import Navbar from './common/Navbar'
// import TextField from '@mui/material/TextField';
// import * as con from '../constants';
// import { useNavigate } from 'react-router-dom';

// const AddChapter = () => {

//   const [values, setValues] = useState({
//     name: '',
//     content: ''
//   });
//   const [typeBtn, setTypeBtn] = useState(null)
//   const navigate = useNavigate();
//   const [hasErr, sethasErr] = useState(false);
//   const [file, setFile] = useState(false);
//   const handleChangeForm = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: values.name,
//         content: values.content
//       })
//     };
//     fetch(con.BASE_URI + "/chapters", requestOptions)
//       .then(response => {
//         console.log(response)
//         if (response.status === 201)
//           navigate("/home");
//         else
//           sethasErr(true)
//       }).catch(err => {
//         console.log(err)
//         sethasErr(true)
//       })

//   };


//   function try1(e) {
//     e.preventDefault()
//     // console.log(e.target.id)
//     {
//       if (e.target.id === "btnradio1") {
//         setFile(true)
//       }
//       else {
//         setTypeBtn(e.target.id)
//         setFile(false)
//       }
//     }
//     console.log(typeBtn)

//   }
//   return (
//     <div className="addChaper">
//       <Navbar />
//       <div className="container d-flex flex-column gap-4">
//         <h1 className="display-4 text-center mt-5" style={{ "fontWeight": "900", color: "#383A3D" }}>ADD YOUR CHAPTER</h1>
//         <form className={""} style={{ "margin": "0 300px" }}>

//           <div className="mb-3">
//             <label for="chapterName" className="form-label fs-3">Enter Chapter Name <code>*</code></label>
//             <input
//               onChange={handleChangeForm("name")}
//               type="name"
//               className="form-control"
//               id="chapterName"
//               aria-describedby="chapterName"
//               placeholder="Chapter Name"
//             />


//             <div className="container" style={{ "margin": "30px 0px", "padding": "0px" }}>
//               <h3>Upload<code>*</code></h3>

//               <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
//                 <input type="radio" className="btn-check" onChange={try1} name="btnradio" id="btnradio1" />
//                 <label className="btn btn-outline-primary" for="btnradio1">Text</label>

//                 <input type="radio" className="btn-check" onChange={try1} name="btnradio" id="btnradio2" />
//                 <label className="btn btn-outline-primary" for="btnradio2">Video</label>

//                 <input type="radio" className="btn-check" onChange={try1} name="btnradio" id="btnradio3" />
//                 <label className="btn btn-outline-primary" for="btnradio3">Image</label>

//                 <input type="radio" className="btn-check" onChange={try1} name="btnradio" id="btnradio4" />
//                 <label className="btn btn-outline-primary" for="btnradio4">Pdf</label>


//               </div>
//               {
//                 file ?
//                   (<div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
//                     <label for="exampleFormControlTextarea1" className="form-label fs-3">Chapter Content<code>*</code></label>
//                     {
//                       typeBtn === "btnradio1" &
//                       <textarea className="form-control"
//                         id="exampleFormControlTextarea1" rows="4"></textarea>}

//                   </div>) :

//                   (
//                     <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
//                       <label for="formFile" className="form-label fs-3">Default file input example<code>*</code></label>
//                       {
//                         typeBtn === "btnradio4" &
//                         <input className="form-control w-50" type={"file"} id="formFile" />
//                       }

//                       {
//                         typeBtn === "btnradio2" &
//                         (<input
//                           onChange={handleChangeForm("name")}
//                           type="name"
//                           className="form-control"
//                           id="chapterName"
//                           aria-describedby="chapterName"
//                           placeholder="Chapter Name"
//                         />)
//                       }
//                     </div>
//                   )
//               }
//               <button type="button" class="btn btn-primary" onClick={handleSubmit}>ADD</button>
//             </div>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default AddChapter

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Alert from '@mui/material/Alert';
// import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/styles";
// import lightblue from "@material-ui/core/colors/lightBlue";
// import Grid from '@material-ui/core/Grid';
// import Header from "./Header";
// import Footer from "./common/Footer";
// import TextField from '@mui/material/TextField';
// import * as con from '../constants'
// import Navbar from "./common/Navbar";

// const useStyles = makeStyles((theme) => ({
//   addchap: {
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


// function AddStudyChapter() {
//   const classes = useStyles();
//   const navigate = useNavigate();

//   const [values, setValues] = React.useState({
//     name: '',
//     content: ''
//   });

//   const [hasErr, sethasErr] = useState(false);

//   const handleChangeForm = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: values.name,
//         content: values.content
//       })
//     };
//     fetch(con.BASE_URI + "/chapters", requestOptions)
//       .then(response => {
//         console.log(response)
//         if (response.status === 201)
//           navigate("/home");
//         else
//           sethasErr(true)
//       }).catch(err => {
//         console.log(err)
//         sethasErr(true)
//       })

//   };

//   return (

//     <>

//     <div>
//     <Navbar/>
//         </div>

//     <div>

//       {hasErr ? 
//       <>
//       <Alert severity="error">
//         Unable to add chapter, please try again.
//       </Alert><br/>
//       </>
//       : <></>}


//       <div className={classes.addchap}>

//         <Paper elevation={3} style={{ width: '100%' }}>
//           <Box p={1.5} className={classes.bluecolor}>
//             <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
//               Chapter Name
//             </Typography><br />
//             <Paper elevation={2}>
//               <TextField onChange={handleChangeForm("name")} id="outlined-basic" placeholder='Enter Chapter Name' variant="outlined" style={{ width: '100%' }} />
//             </Paper>
//             <br />
//             <Typography variant="h4" style={{ textAlign: 'left', color: 'white' }}>
//               Chapter Data
//             </Typography><br />
//             <Paper elevation={2}>
//               <TextField onChange={handleChangeForm("content")} id="outlined-multiline-static" multiline rows={10} placeholder="Enter Chapter's Content" style={{ width: '100%' }} />
//             </Paper>
//           </Box>
//           <br />
//           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'right', paddingRight: 30 }}>
//             <Grid item>
//               <Button variant="contained" className={classes.bluecolorcpy} onClick={() => { navigate("/home"); }}>
//                 BACK
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" className={classes.bluecolorcpy} onClick={handleSubmit}>
//                 ADD CHAPTER
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
//     </>
//   );
// }

// export default AddStudyChapter;

import React, { useState } from 'react'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import TextField from '@mui/material/TextField';
import * as con from '../constants';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../utility/LoadingSpinner";

const AddChapter = () => {

  const [values, setValues] = useState({
    name: '',
    content: ''
  });
  const [typeBtn, setTypeBtn] = useState(null)
  const navigate = useNavigate();
  const [hasErr, sethasErr] = useState(false);
  const [file, setFile] = useState(false);
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState('');
  const handleChangeForm = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setLoad(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        name: values.name,
        content: message
      })
    };
    fetch(con.BASE_URI + "/chapters", requestOptions)
      .then(response => {
        setLoad(false);
        console.log(response)
        if (response.status === 201)
          navigate("/home");
        else
          sethasErr(true)
      }).catch(err => {
        setLoad(false);
        console.log(err)
        sethasErr(true)
      })

  };


  const btnOptions = [
    { title: "Text", label_id: "text" },
    { title: "Video", label_id: "video" },
    { title: "Image", label_id: "image" },
    { title: "Pdf", label_id: "pdf" },
  ]

  function try1(e) {
    e.preventDefault()
    // console.log(e.target.id)
    setTypeBtn(e.target.id)
  }

  const handleMessageChange = event => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div className="addChaper">
      <Navbar />
      <div className="container d-flex flex-column gap-4">
        <h1 className="display-4 text-center mt-5" style={{ "fontWeight": "900", color: "#383A3D" }}>ADD YOUR CHAPTER</h1>
        {
          load ? <LoadingSpinner></LoadingSpinner> : (
            <>
              <div className="container d-flex flex-column gap-4">

                <form className={""} style={{ "margin": "0 300px" }}>

                  <div className="mb-3">
                    <label for="chapterName" className="form-label fs-3">Enter Chapter Name <code>*</code></label>
                    <input
                      onChange={handleChangeForm("name")}
                      type="name"
                      className="form-control"
                      id="chapterName"
                      aria-describedby="chapterName"
                      placeholder="Chapter Name"
                    />


                    <div className="container" style={{ "margin": "30px 0px", "padding": "0px" }}>
                      <h3>Upload<code>*</code></h3>

                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                        {btnOptions.map((item, key) => (
                          <>
                            <input type="radio" className="btn-check" onClick={try1} name="btnradio" id={item.label_id} />
                            <label className="btn btn-outline-primary" for={item.label_id}>{item.title}</label>
                          </>
                        ))}

                      </div>

                      {
                        typeBtn === 'text' &&
                        (
                          <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                            <label for="exampleFormControlTextarea1" className="form-label fs-3">Enter Chapter Content<code>*</code></label>
                            <textarea className="form-control"
                              id="exampleFormControlTextarea1" rows="4" onChange={handleMessageChange}></textarea>
                          </div>
                        )
                      }

                      {
                        typeBtn === 'video' &&
                        (
                          <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                            <label for="videoLink" className="form-label fs-3">Enter Video Link<code>*</code></label>
                            <input
                              type="link"
                              className="form-control"
                              id="videoLink"
                              aria-describedby="videoLink"
                              placeholder="URL"
                            />
                          </div>
                        )
                      }

                      {
                        typeBtn === 'image' &&
                        (
                          <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                            <label for="imageUpload" className="form-label fs-3">Upload Image<code>*</code></label>
                            <input
                              type="file"
                              accept='image/*'
                              className="form-control w-75"
                              id="imageUpload"
                              aria-describedby="imageUpload"
                              placeholder="URL"
                            />
                          </div>
                        )
                      }

                      {
                        typeBtn === 'pdf' &&
                        (
                          <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                            <label for="pdfUpload" className="form-label fs-3">Upload PDF<code>*</code></label>
                            <input
                              type="file"
                              accept='.pdf'
                              className="form-control w-75"
                              id="pdfUpload"
                              aria-describedby="pdfUpload"
                              placeholder="URL"
                            />
                          </div>
                        )
                      }

                      <div className="mt-5">
                        <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit}>ADD</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )
        }
        {/* <form className={""} style={{ "margin": "0 300px" }}>

          <div className="mb-3">
            <label for="chapterName" className="form-label fs-3">Enter Chapter Name <code>*</code></label>
            <input
              onChange={handleChangeForm("name")}
              type="name"
              className="form-control"
              id="chapterName"
              aria-describedby="chapterName"
              placeholder="Chapter Name"
            />


            <div className="container" style={{ "margin": "30px 0px", "padding": "0px" }}>
              <h3>Upload<code>*</code></h3>

              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                {btnOptions.map((item, key) => (
                  <>
                    <input type="radio" className="btn-check" onClick={try1} name="btnradio" id={item.label_id} />
                    <label className="btn btn-outline-primary" for={item.label_id}>{item.title}</label>
                  </>
                ))}

              </div>

              {
                typeBtn === 'text' &&
                (
                  <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                    <label for="exampleFormControlTextarea1" className="form-label fs-3">Enter Chapter Content<code>*</code></label>
                    <textarea className="form-control"
                      id="exampleFormControlTextarea1" rows="4" onChange={handleMessageChange}></textarea>
                  </div>
                )
              }

              {
                typeBtn === 'video' &&
                (
                  <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                    <label for="videoLink" className="form-label fs-3">Enter Video Link<code>*</code></label>
                    <input
                      type="link"
                      className="form-control"
                      id="videoLink"
                      aria-describedby="videoLink"
                      placeholder="URL"
                    />
                  </div>
                )
              }

              {
                typeBtn === 'image' &&
                (
                  <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                    <label for="imageUpload" className="form-label fs-3">Upload Image<code>*</code></label>
                    <input
                      type="file"
                      accept='image/*'
                      className="form-control w-75"
                      id="imageUpload"
                      aria-describedby="imageUpload"
                      placeholder="URL"
                    />
                  </div>
                )
              }

              {
                typeBtn === 'pdf' &&
                (
                  <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                    <label for="pdfUpload" className="form-label fs-3">Upload PDF<code>*</code></label>
                    <input
                      type="file"
                      accept='.pdf'
                      className="form-control w-75"
                      id="pdfUpload"
                      aria-describedby="pdfUpload"
                      placeholder="URL"
                    />
                  </div>
                )
              }

              <div className="mt-5">
                <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit}>ADD</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer /> */}
    </div>
    <Footer />

    </div>
  )
}

export default AddChapter