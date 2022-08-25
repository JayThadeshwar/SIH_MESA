import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import b1 from './images/b1.png';
import b2 from './images/b2.png';
import b3 from './images/b3.png';
import b4 from './images/b4.png';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './game_page.css';

const modalstyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // height: 190,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  
const Game_over = () => {
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location.state.id)

    const onHandleClick = () => {
        navigate('/flyingballoon')
      }

    // console.log(score)
    return (
        <div className='demo' style={{ height: '100vh' }}>
        <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 35, paddingTop: 25 }}>Right: 0</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 50, paddingTop: 25 }}>Balloon Popping Game </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 35, paddingTop: 25 }}>Wrong: 0</Typography>
                        </Grid>
                    </Grid>
            </Box>
            <div style={{ width: '100px' }}>
            <article className='art1'>
            <img className="img1" src={b1} alt="img" />
            </article>
            <article className='art2'>
            <img className="img2" src={b2} alt="img" />
            </article>
            <article className='art3'>
            <img className="img3" src={b3} alt="img" />
            </article>
            <article className='art4'>
            <img className="img4" src={b4} alt="img" />
            </article>
            </div>
            <Paper elevation={3}>
                <Box sx={modalstyle} style={{paddingLeft:'7em',paddingRight:'7em'}}>
                    <Typography align="center" variant="h4">
                        Game Over
                    </Typography>
                    <Typography align="center" variant="h5" sx={{ mt: 2 }}>
                    Your score is {location.state.id}       
                    </Typography>
                    <Stack direction={'row'} spacing={2} justifyContent="center" paddingTop={2}>
                        <Button variant="contained" color="success" onClick={onHandleClick}>Play Again</Button>
                        <Button variant="contained" color="error" onClick={()=>{navigate('/home')}}> 
                            EXIT
                        </Button> 
                        {/* transfer to home page */}
                    </Stack>
                </Box>
            </Paper>
        </div>
    )

}
export default Game_over;