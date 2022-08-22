import React from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import { useLocation, useNavigate } from "react-router-dom";

function Scenarios() {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <div>
            <Grid container spacing={3} >
                <Grid item xs={4}>
                    <Box
                        sx={{
                            width: 500,
                            height: 300,
                            border: '1px solid red',
                            margin: '50px',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        onClick={() => { navigate('/chatbot', { state: { projectId: 'chatbot-1-360106' } }) }}
                    >
                        <h3 style={{ textAlign: 'center', marginTop: '40px' }}>
                            Introduction
                        </h3>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            width: 500,
                            height: 300,
                            margin: '50px',
                            border: '1px solid red',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        onClick={() => { navigate('/chatbot', { state: { projectId: 'dinning-out' } }) }}
                    ><h3 style={{ textAlign: 'center', marginTop: '40px' }}>
                            Dinning
                        </h3></Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            width: 500,
                            height: 300,
                            margin: '50px',
                            border: '1px solid red',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        onClick={() => { navigate('/chatbot', { state: { projectId: 'test-for-youtube-ebap' } }) }}
                    ><h3 style={{ textAlign: 'center', marginTop: '40px' }}>
                            Banking
                        </h3></Box>
                </Grid>
            </Grid>



        </div>
    )
}

export default Scenarios