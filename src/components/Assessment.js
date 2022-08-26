// import React from "react";
// import { useNavigate } from 'react-router-dom';
// import { makeStyles } from "@material-ui/styles";
// import lightblue from "@material-ui/core/colors/lightBlue";
// import Header from "./Header"
// import Footer from "./common/Footer"
// import SelfEvalComp from "./Mcq";

// const useStyles = makeStyles((theme) => ({
//     grammar: {
//         display: 'flex',
//         '& > *': {
//             //   backgroundColor: blue[50],
//         },
//     },
//     bluecolor: {
//         backgroundColor: lightblue[300],
//         padding: 30
//     },
//     bluecolorcpy: {
//         backgroundColor: lightblue[300],
//     },

// }));


// function GrammaticalAndAssessment() {

//     // const classes = useStyles();
//     const navigate = useNavigate();
//     // const [value1, setValue1] = React.useState('');
//     // const [value2, setValue2] = React.useState('');
//     // const [value3, setValue3] = React.useState('');
//     // const [value4, setValue4] = React.useState('');
//     // const [value5, setValue5] = React.useState('');
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         navigate("/home");
//     };

//     return (
//         <div>
//             <Header></Header>
//             <SelfEvalComp />
//             <Footer></Footer>
//         </div>
//     )
//     SelfEvalComp();
// }

// export default GrammaticalAndAssessment;


import React from 'react';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SelfEvalComp from "./Mcq";

const Assessment = () => {
  return (
    <>
        <Navbar />
        <div>
            <SelfEvalComp />
        </div>
        <Footer />
    </>
  )
}

export default Assessment