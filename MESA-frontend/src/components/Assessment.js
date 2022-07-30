import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import lightblue from "@material-ui/core/colors/lightBlue";
import Grid from '@material-ui/core/Grid';
import Header from "./Header"
import Footer from "./Footer"
import SelfEvalComp from "./Mcq";

const useStyles = makeStyles((theme) => ({
    grammar: {
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


function GrammaticalAndAssessment() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    const [value4, setValue4] = React.useState('');
    const [value5, setValue5] = React.useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/home");
    };

    return (
        <div>
             <Header></Header><br /> 
             <SelfEvalComp/> <br/>
             <Footer></Footer>
        </div>
    )
    SelfEvalComp();
}

export default GrammaticalAndAssessment;