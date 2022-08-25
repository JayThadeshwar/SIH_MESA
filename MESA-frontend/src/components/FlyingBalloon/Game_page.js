import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import b1 from './images/b1.png';
import b2 from './images/b2.png';
import b3 from './images/b3.png';
import b4 from './images/b4.png';
import './game_page.css';
import Modal from '@mui/material/Modal';
import { green, pink } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
    custom: {
        color: 'blue',
        fontWeight: 'bold'
    }
}));

// const StyledChip = withStyles({
//     root: {
//         "&&:hover": {
//             borderColor: "black",

//         }
//     }
// })(Chip);

const Div_Animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1, y: -120 },
    exit: { opacity: 0 },
    transition: { y: { duration: 9 } }
}

const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Game_page = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [show, setshow] = useState(false)
    const [item, setItem] = useState()
    const [score, setScore] = useState({ right: 0, wrong: 0 })
    const [options, setOptions] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/game/2`)
            .then((response) => response.json())
            .then((actualData) => {
                setOptions(actualData['words']);
            });
    }, [])


    useEffect(() => {
        if (options.length > 0) {

            setItem(options[0])
            console.log(options[0])
        }
    }, [options])

    useEffect(() => {
        if (item !== undefined) {
            setshow(true)
            console.log(item)
        }
    }, [item])


    useEffect(() => {
        setItem(options[score.right + score.wrong])
    }, [score])
    
    useEffect(() => {
        setItem(options[score.right + score.wrong])
        const timer = setTimeout(() => {
            setScore({
                right: score.right,
                wrong: score.wrong + 1
            })
            if (score.wrong === 2) {
                setshow(false);
                navigate('/balloonresult', {state:{id:score.right}})
            }
        }, 9000);
        return () => clearTimeout(timer);

    }, [score])

    const check_selection = (selection, ans) => {
        if (ans === selection) {
            setScore({
                right: score.right + 1,
                wrong: score.wrong
            });
        }
        else {
            setScore({
                right: score.right,
                wrong: score.wrong + 1
            });
        }
        if (score.wrong === 2) {
            setshow(false)
            navigate('/balloonresult', {state:{id:score.right}})
        }
    }

    function Balloon1(sc, i) {

        return (
            <div className='demo' style={{ height: '100vh' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 35, paddingTop: 25 }}>Right: {score.right}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 50, paddingTop: 25 }}>Balloon Popping Game </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 35, paddingTop: 25 }}>Wrong: {score.wrong}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Stack alignItems="center" paddingTop={'2em'}>
                    <Chip label={item['definition']} variant="outlined" alignItems="center" style={{
                        fontSize: 30,
                        color: "black",
                        fontWeight: 'bold',
                        padding: "25px",
                        borderColor: 'red',
                        borderWidth: 2
                    }}>

                    </Chip>
                </Stack>

                <div style={{ width: '100px' }}>
                    {/* <Paper elevation={2}> */}

                    {/* Balloon 1 */}

                    <article className='art1' onClick={() => {
                        check_selection(item['wordOptions'][0], item['wordOptions'][item['answerIndex']])
                    }}>
                        <motion.div {...Div_Animations}>
                            <img className="img1" src={b1} alt="img" />
                            <h2 className='b1'>{item['wordOptions'][0]}</h2>
                        </motion.div>
                    </article>

                    {/* Balloon 2 */}

                    <article className='art2' onClick={() => {
                        check_selection(item['wordOptions'][1], item['wordOptions'][item['answerIndex']])
                    }}>
                        <motion.div {...Div_Animations}>
                            <img className="img2" src={b2} alt="img" />
                            <h2 className='b2'>{item['wordOptions'][1]}</h2>
                        </motion.div>
                    </article>

                    {/* Balloon 3 */}

                    <article className='art3' onClick={() => {
                        check_selection(item['wordOptions'][2], item['wordOptions'][item['answerIndex']])
                    }}>
                        <motion.div  {...Div_Animations}>
                            <img className="img3" src={b3} alt="img" />
                            <h2 className='b3'>{item['wordOptions'][2]}</h2>
                        </motion.div>
                    </article>
                    {/* Balloon 4 */}
                    <article className='art4' onClick={() => {
                        check_selection(item['wordOptions'][3], item['wordOptions'][item['answerIndex']])
                    }}>
                        <motion.div  {...Div_Animations}>
                            <img className="img4" src={b4} alt="img" />
                            <h2 className='b4'>{item['wordOptions'][3]}</h2>
                        </motion.div>
                    </article>
                    {/* </Paper> */}
                </div>
            </div>
        )
    }

    return (
        <div>
            
            {show && <Balloon1 sc={score} i={item}></Balloon1>}
        </div>
    )
}
export default Game_page;