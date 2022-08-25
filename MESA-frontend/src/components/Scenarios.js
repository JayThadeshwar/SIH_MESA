import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Scenarios.css"
import Carousel from "better-react-carousel";
import Card from "@mui/material/Card";
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function Scenarios() {
    const location = useLocation()
    const navigate = useNavigate()
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [])

    return (
        <div >
            <div id="bot-bg-landscape" style={{ height: '100vh' }}>
                <div style={{ padding: '150px 0 150px 30px' }}>
                    <Carousel mobileBreakpoint={550} cols={windowDimensions.width < '700' ? 2 : 3} rows={1} gap={100} loop >
                        <Carousel.Item>
                            <Card className='ffa' style={{ height: '100%' }}>
                                <div
                                    className='item-inner'
                                >
                                    <div class="info">
                                        <div class="text">
                                            Introduction
                                        </div>
                                        <div class="done">
                                            1/3
                                        </div>
                                    </div>
                                    <div class="buttons">
                                        <button class="btn btn-primary btn-start " style={{

                                            color: '#fff',
                                            backgroundColor: '#f2805e',
                                            borderColor: 'transparent',
                                            borderRadius: '100px',
                                            fontSize: '17px',
                                            padding: '6px 10px',

                                        }} data-ember-action="" data-ember-action-94="94"
                                            onClick={() => { navigate('/chatbot', { state: { projectId: 'chatbot-1-360106' } }) }}

                                        >
                                            <span>
                                                Start
                                            </span>
                                            <div class="loader"></div>
                                            <div id="ember95" class="ripple-container ember-view"></div>
                                        </button>
                                    </div>
                                </div>

                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className='ffa' style={{ height: '100%' }}>
                                <div
                                    // style={{ textAlign: 'center', marginTop: '40px' }}
                                    className='item-inner'
                                >
                                    <div class="info">
                                        <div class="text">
                                            Dining
                                        </div>
                                        <div class="done">
                                            2/3
                                        </div>
                                    </div>
                                    <div class="buttons">
                                        <button class="btn btn-primary btn-start " style={{

                                            color: '#fff',
                                            backgroundColor: '#f2805e',
                                            borderColor: 'transparent',
                                            borderRadius: '100px',
                                            fontSize: '17px',
                                            padding: '6px 10px',

                                        }} data-ember-action="" data-ember-action-94="94"
                                            onClick={() => { navigate('/chatbot', { state: { projectId: 'dinning-out' } }) }}
                                        >
                                            <span>
                                                Start
                                            </span>
                                            <div class="loader"></div>
                                            <div id="ember95" class="ripple-container ember-view"></div>
                                        </button>
                                    </div>
                                </div>

                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className='ffa' style={{ height: '100%' }}>
                                <div
                                    // style={{ textAlign: 'center', marginTop: '40px' }}
                                    className='item-inner'
                                >
                                    <div class="info">
                                        <div class="text">
                                            Banking
                                        </div>
                                        <div class="done">
                                            3/3
                                        </div>
                                    </div>
                                    <div class="buttons">
                                        <button class="btn btn-primary btn-start " style={{

                                            color: '#fff',
                                            backgroundColor: '#f2805e',
                                            borderColor: 'transparent',
                                            borderRadius: '100px',
                                            fontSize: '17px',
                                            padding: '6px 10px',

                                        }} data-ember-action="" data-ember-action-94="94"
                                            onClick={() => { navigate('/chatbot', { state: { projectId: 'test-for-youtube-ebap' } }) }}

                                        >
                                            <span>
                                                Start
                                            </span>
                                            <div class="loader"></div>
                                            <div id="ember95" class="ripple-container ember-view"></div>
                                        </button>
                                    </div>
                                </div>

                            </Card>
                        </Carousel.Item>



                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Scenarios