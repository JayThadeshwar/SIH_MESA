import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Card from "./Sections/Card";
import io from 'socket.io-client';
import RecordRTC from 'recordrtc';
import { useLocation } from "react-router-dom";
import suggestions from './suggestion';
import MessageBot from './Sections/MessageBot';
import MessageHuman from './Sections/MessageHuman';
import SuggestionMsg from './Sections/SuggestionMsg';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "../../css/Chatbot.css"
import playOutput from '../common/PlayAudio';


const socketio = io.connect("http://localhost:5001");
function Chatbot() {
    const location = useLocation()
    const [isRecording, setIsRecording] = useState(false)
    const [fromInput, setFromInput] = useState()
    const [toInput, setToInput] = useState()
    const [hideText, setHideText] = useState(true)
    const [isTranslate, setIsTranslate] = useState(true)
    const [recordAudio, setrecordAudio] = useState()
    const [msgArr, setMsgArr] = useState([])
    const [suggestArr, setSuggestArr] = useState([])
    const [projectId, setProjectId] = useState(location.state.projectId || 'dinning-out')
    // const [projectId, setProjectId] = useState('dinning-out')

    useEffect(() => {
        if (projectId !== 'stt-ewll') { eventQuery('firstMsg') }
        socketio.on('connect', function () {
            console.log('connected')
        });
        socketio.on('results', function (data) {
            console.log(data)
            let agentName = data[0].queryResult.intent.name.split('/agent/intents/')
            let conversationBot
            if (projectId !== 'stt-ewll') {
                if (projectId === "chatbot-1-360106") {
                    setSuggestArr(suggestions[agentName[0].split('/')[1]][agentName[1]])
                }

                conversationBot = {
                    who: 'bot',
                    content: {
                        text: {
                            text: data[0].queryResult.fulfillmentText,
                            translation: data[0].queryResult?.translateFulfillmentText
                        }
                    }
                }
            } else {
                conversationBot = {
                    who: 'bot',
                    content: {
                        text: {
                            text: data[0].queryResult?.translateQueryText,
                        }
                    }
                }
            }
            let conversation = {
                who: 'user',
                content: {
                    text: {
                        text: data[0].queryResult.queryText,
                    },
                }
            }

            // dispatch(saveMessage(conversation))
            // dispatch(saveMessage(conversationBot))
            setMsgArr(o => [...o, conversation])
            setMsgArr(o => [...o, conversationBot])
            var messageBody = document.querySelector('#bot-convo-id');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
            playOutput(data[0].outputAudio);
        });
        socketio.on('results-tts', function (data) {
            playOutput(data);
        });
        return () => { }
    }, [])
    const keyPressHanlder = (e, bln) => {
        if (e.key === "Enter" || bln) {
            e.preventDefault()
            let val = e.target.value

            if (!e.target.value) {
                console.log(document.getElementById('ember109').value)
                if (document.getElementById('ember109').value) {
                    val = document.getElementById('ember109').value
                } else {

                    return alert('you need to type somthing first')
                }
            }

            //we will send request to text query route 
            textQuery(val)
            var messageBody = document.querySelector('#bot-convo-id');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;


            e.target.value = "";
        }
    }

    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        setMsgArr(o => [...o, conversation])        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text: text,
            projectId: projectId
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('http://localhost:5001/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }

                setMsgArr(o => [...o, conversation])
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            setMsgArr(o => [...o, conversation])

        }

    }

    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event: event,
            projectId: projectId
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('http://localhost:5001/api/dialogflow/eventQuery', eventQueryVariables)
            console.log(response.data)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }
                let agentName = response.data.intent.name.split('/agent/intents/')
                console.log(agentName)

                // dispatch(saveMessage(conversation))
                setMsgArr(o => [...o, conversation])
                console.log(agentName[1])
                if (agentName[0].split('/')[1] === 'chatbot-1-360106') {
                    console.log(suggestions[agentName[0].split('/')[1]])
                    console.log(agentName[0].split('/')[1])
                    console.log(suggestions[agentName[0].split('/')[1]][agentName[1]])
                    setSuggestArr(suggestions[agentName[0].split('/')[1]][agentName[1]])
                }
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            // dispatch(saveMessage(conversation))
            setMsgArr(o => [...o, conversation])
        }

    }

    const renderCards = (cards) => {
        return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />)
    }


    const renderOneMessage = (message, i) => {
        // we need to give some condition here to separate message kinds 


        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            if (message.who === 'bot') {

                return <MessageBot langCode={toInput} isConvo={projectId === 'stt-ewll'} msg={`conversation-item conversation-item-${i} bot`} key={i} who={message.who} text={message.content.text.text} translation={message.content.text.translation} isTranslate={isTranslate} />
            } else {
                return <MessageHuman langCode={fromInput} isConvo={projectId === 'stt-ewll'} msg={`conversation-item conversation-item-${i} human`} key={i} who={message.who} text={message.content.text.text}></MessageHuman>
            }
        } else if (message.content && message.content.payload?.fields.card) {

            // const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

            return <div>
                {/* <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item> */}
            </div>
        }
    }

    const renderMessage = (returnedMessages) => {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }
    function stopRecordingF() {
        setIsRecording(false)
        recordAudio.stopRecording(function () {

            // after stopping the audio, get the audio data
            recordAudio.getDataURL(function (audioDataURL) {

                // submit the audio file to the server
                if (projectId !== 'stt-ewll') {
                    var files = {
                        audio: {
                            type: recordAudio.getBlob().type || 'audio/wav',
                            dataURL: audioDataURL
                        },
                        // project_id:'dinning-out'
                        project_id: projectId,
                        fromLangCode: 'en',
                        toLangCode: localStorage.getItem('i18nextLng'),

                    };
                    socketio.emit('message', files)
                } else {
                    var files = {
                        audio: {
                            type: recordAudio.getBlob().type || 'audio/wav',
                            dataURL: audioDataURL
                        },
                        // project_id:'dinning-out'
                        project_id: projectId,
                        language_code: fromInput,
                        output_langCode: toInput,
                    };
                    socketio.emit('message_translate', files)
                };
            });
        });
    };
    function startRecordingF() {
        // recording started
        setIsRecording(true)

        // make use of HTML 5/WebRTC, JavaScript getUserMedia()
        // to capture the browser microphone stream
        navigator.getUserMedia({
            audio: true
        }, function (stream) {
            let rrecordAudio = RecordRTC(stream, {
                type: 'audio',
                mimeType: 'audio/webm',
                sampleRate: 44100, // this sampleRate should be the same in your server code

                // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
                // CanvasRecorder, GifRecorder, WhammyRecorder
                recorderType: RecordRTC.StereoAudioRecorder,

                // Dialogflow / STT requires mono audio
                numberOfAudioChannels: 1,

                // get intervals based blobs
                // value in milliseconds
                // as you might not want to make detect calls every seconds
                timeSlice: 4000,

                // only for audio track
                // audioBitsPerSecond: 128000,

                // used by StereoAudioRecorder
                // the range 22050 to 96000.
                // let us force 16khz recording:
                desiredSampRate: 16000
            });


            rrecordAudio.startRecording();
            setrecordAudio(rrecordAudio)
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };

    return (
        <div id="bot-bg-landscape" style={{
            height: '100vh',
            width: "100%",
            display: "flex",
            justifyContent: "center", alignItems: 'center'
        }}>
            {projectId === 'stt-ewll' && <FormControl style={{ marginRight: '30px' }}>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select

                    value={fromInput}
                    style={{ 'width': '130px' }}
                    label="fromInput"
                    onChange={(e) => {
                        console.log(e.target)
                        setFromInput(e.target.value)
                    }}
                >
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'hi'}>Hindi</MenuItem>
                    <MenuItem value={'mr'}>Marathi</MenuItem>
                    <MenuItem value={'kn'}>Kannda</MenuItem>
                    <MenuItem value={'ta'}>Tamil</MenuItem>
                </Select>
            </FormControl>}
            <div className="learn-main">
                <div className="bot-view learning-unit-view has-scroll-animations ember-view">

                    {/* <div >


                        {msgArr.length !== 0 && renderMessage(msgArr)}


                    </div> */}
                    {/* <input
                    style={{
                        margin: 0, width: '100%', height: 50,
                        borderRadius: '4px', padding: '5px', fontSize: '1rem'
                    }}
                    placeholder="Send a message..."
                    onKeyPress={keyPressHanlder}
                    type="text"
                /> */}
                    <hr></hr>
                    <div class="bot-conversation" style={{ touchAction: "none" }}>
                        <div id='bot-convo-id' class="bot-conversation-inner" style={{ transform: "translate(0px, 0px) translateZ(0px)", maxHeight: projectId !== 'stt-ewll' ? '250px' : '370px', height: projectId !== 'stt-ewll' ? '250px' : '370px', overflowY: 'auto' }}>
                            <div class="conversation-group active done">
                                {/* <div class="conversation-item conversation-item-0-0 bot" style={{ display: "block" }}>
                                    <div class="assistant" data-ember-action="" data-ember-action-138="138" style={{ visibility: "visible", opacity: 1, transform: "translateX(0%)" }}>
                                    </div><div class="bubble" data-ember-action="" data-ember-action-139="139" style={{ opacity: 1 }}>
                                        <div class="bubble-inner ">
                                            <div class="text">
                                                <span id="ember140" class="ember-view">                                शुभ मध्याह्न।
                                                </span>                          </div>

                                            <div class="translation is-light">
                                                <span id="ember141" class="ember-view">                                Good afternoon.
                                                </span>                            </div>

                                            <div class="dot-loader dot-loader-bounce">
                                                <div class="dot"></div>
                                                <div class="dot"></div>
                                                <div class="dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {msgArr.length !== 0 && renderMessage(msgArr)}
                                {/* <div class="conversation-item conversation-item-1 human" style={{ display: "block" }}>
                                    <div class="bubble" style={{ opacity: 1 }}>
                                        <div class="bubble-inner">
                                            <div class="text">
                                                <span>शुभ अपराह्न।</span>
                                            </div><div class="emoji">
                                                <div class="emoji-image" style={{ backgroundImage: "url(https://cdn.jsdelivr.net/emojione/assets/3.1.1/png/64/1f603.png)" }}></div>
                                            </div>
                                        </div>
                                    </div><div style={{ width: '50px', height: '50px', borderRadius: '25px', visibility: 'visible', opacity: 1, transform: 'translateX(0%)' }} id="ember160" class="avatar avatar-profile-pic avatar-default ember-view"></div>
                                </div> */}


                            </div>
                        </div>
                    </div>
                    <div className='bot-controls' >
                        <div className='bot-controls-inner' >
                            {projectId !== 'stt-ewll' && <div class="bot-info">
                                <div class="bubble">
                                    <div class="text is-light is-size-7">
                                        <span id="ember292" class="auto-font-width center-text ember-view">
                                            Things you can say:

                                            <div class="clearfix"></div></span>
                                    </div>
                                </div>
                            </div>}
                            <div class="suggestions ">
                                <div class="suggestions-inner ">
                                    {suggestArr?.length !== 0 && suggestArr !== undefined && suggestArr.map((data) => {
                                        console.log(data)
                                        return (
                                            <>
                                                <SuggestionMsg suggestion={data} socketio={socketio}></SuggestionMsg>
                                            </>)
                                    }
                                    )}

                                </div>
                            </div>
                            <div class="input-area">
                                <div class="input-area-inner">
                                    {projectId !== 'stt-ewll' && <div class="toggle-setting is-light is-size-7">
                                        <div class="text">Translations</div>
                                        <div id="ember294" class="switch-toggle-button ember-view">
                                            <input id="switch-toggle-translation" onInput={() => {
                                                setIsTranslate(!isTranslate)
                                            }} class="switch-input" type="checkbox" checked={isTranslate} />
                                            <label for="switch-toggle-translation" class="switch-label">
                                                <div class="switch-label-after iscroll-exception">
                                                    <div id="ember296" class="ripple-container ember-view" style={{
                                                        borderRadius: "50%",
                                                        display: "none",
                                                        height: "38px",
                                                        width: "38px",
                                                    }}></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>}

                                    {!hideText ? (
                                        <>
                                            <div class="type-input show" style={{ bottom: projectId !== 'stt-ewll' ? '-130px' : '-100px' }}>
                                                <form data-ember-action="" data-ember-action-108="108">
                                                    <input placeholder="Type here to reply" id="ember109" onKeyPress={(event) => keyPressHanlder(event, false)} class="ember-text-field ember-view" type="text" />
                                                    <button class="btn btn-send" type="button" onClick={(event) => { if (projectId === 'stt-ewll' && fromInput === undefined && toInput === undefined) { alert('Please select from and to language') } else { keyPressHanlder(event, true) } }} >
                                                        <div id="ember110" class="ripple-container ember-view"></div>
                                                    </button>
                                                </form>
                                            </div>
                                            <button class="btn btn-type-switch type" onClick={() => setHideText(true)} data-ember-action="" data-ember-action-112="112" style={{ position: "absolute", bottom: projectId !== 'stt-ewll' ? '-130px' : '-100px' }}>
                                                <div id="ember113" class="ripple-container ember-view" style={{ borderRadius: "50%", display: "none", height: "44px", width: "44px" }}></div>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div class="microphone ">
                                                <div id="ember111" class="speech-record-button ember-view">
                                                    <button class="btn btn-record" onClick={() => {
                                                        if (projectId === 'stt-ewll' && fromInput === undefined && toInput === undefined) { alert('Please select from and to language') } else {
                                                            if (!isRecording) { startRecordingF() }
                                                            else {
                                                                stopRecordingF()
                                                            }
                                                        }
                                                    }}>
                                                    </button></div>
                                            </div>
                                            <button class="btn btn-type-switch" onClick={() => setHideText(false)} data-ember-action="" data-ember-action-112="112">
                                                <div id="ember113" class="ripple-container ember-view"></div>
                                            </button>
                                        </>

                                    )}


                                </div>
                            </div>
                            {/* {suggestArr?.length !== 0 && suggestArr !== undefined && suggestArr.map((data) => {
                                return (
                                    <>
                                        <p>
                                            {data}
                                        </p>
                                        <button onClick={() =>{
                                            let payload = {
                                                'text':data,
                                                'gender':'FEMALE',
                                                'language_code':'en-IN',
                                                'speed':0.85
                                            }
                                            console.log(payload)
                                            socketio.emit('tts-message', payload)
                                        }}>Listen</button>
                                    </>
                                )
                            })} */}
                        </div>
                    </div>
                    <hr></hr>
                    {/* <div>
                        <button id="start-recording" onClick={startRecordingF} disabled={isRecording}>Start Recording</button>
                        <button id="stop-recording" onClick={stopRecordingF} disabled={!isRecording}>Stop Recording</button>
                        <button onClick={() => { setIsTranslate(!isTranslate) }}>Translate on/off</button>
                    </div> */}
                </div>
            </div>
            {projectId === 'stt-ewll' && <FormControl style={{ marginLeft: '30px' }} >
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select

                    value={toInput}
                    style={{ 'width': '130px' }}
                    label="roInput"
                    onChange={(e) => {
                        console.log(e.target)
                        setToInput(e.target.value)
                    }}
                >
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'hi'}>Hindi</MenuItem>
                    <MenuItem value={'mr'}>Marathi</MenuItem>
                    <MenuItem value={'kn'}>Kannda</MenuItem>
                    <MenuItem value={'ta'}>Tamil</MenuItem>
                </Select>
            </FormControl>}
        </div>

    )
}

export default Chatbot;
