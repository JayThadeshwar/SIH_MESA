import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import Card from "./Sections/Card";
import io from 'socket.io-client';
import RecordRTC from 'recordrtc';
import { useSpeechSynthesis } from "react-speech-kit";
import { useLocation, useNavigate } from "react-router-dom";


const socketio = io.connect("http://localhost:5000");
function Chatbot() {
    console.log('hello')
    const [isRecording, setIsRecording] = useState(false)
    const [recordAudio, setrecordAudio] = useState()
    const [msgArr, setMsgArr] = useState([])

    // const [projectId, setProjectId] = useState('chatbot-1-360106') //'dinning-out'
    const location = useLocation()
    console.log(location.state.projectId)
    const [projectId, setProjectId] = useState(location.state.projectId || 'dinning-out') //'dinning-out'
    const { speak } = useSpeechSynthesis();

    useEffect(() => {
        eventQuery('firstMsg')
        socketio.on('connect', function () {
            console.log('connected')
        });
        socketio.on('results', function (data) {
            console.log('%%%%%%%%')
            console.log(data)
            let conversation = {
                who: 'user',
                content: {
                    text: {
                        text: data[0].queryResult.queryText,
                    },

                }
            }
            let conversationBot = {
                who: 'bot',
                content: {
                    text: {
                        text: data[0].queryResult.fulfillmentText,
                        translation: data[0].queryResult.translateFulfillmentText
                    }
                }
            }

            // dispatch(saveMessage(conversation))
            // dispatch(saveMessage(conversationBot))
            setMsgArr(o => [...o, conversation])
            setMsgArr(o => [...o, conversationBot])
            console.log(data[0].outputAudio);
            playOutput(data[0].outputAudio);
        });
        socketio.on('server_setup', function (data) {
            console.log(data);
        });
        socketio.on('error', (err) => {
            console.log(err)
        })
        return () => {
        }
    }, [])
    function playOutput(arrayBuffer) {
        console.log(arrayBuffer)
        let audioContext = new AudioContext();
        let outputSource;
        try {
            if (arrayBuffer.byteLength > 0) {
                audioContext.decodeAudioData(arrayBuffer,
                    function (buffer) {
                        audioContext.resume();
                        outputSource = audioContext.createBufferSource();
                        outputSource.connect(audioContext.destination);
                        outputSource.buffer = buffer;
                        outputSource.start(0);
                    },
                    function () {
                        console.log(arguments);
                    });
            }
        } catch (e) {
            console.log(e);
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
            const response = await Axios.post('http://localhost:5000/api/dialogflow/textQuery', textQueryVariables)

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
            const response = await Axios.post('http://localhost:5000/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }


                // dispatch(saveMessage(conversation))
                setMsgArr(o => [...o, conversation])
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


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    const renderCards = (cards) => {
        return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />)
    }


    const renderOneMessage = (message, i) => {
        console.log('message', message)

        // we need to give some condition here to separate message kinds 

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} translation={message.content.text.translation} />
        } else if (message.content && message.content.payload?.fields.card) {

            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

            return <div>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>
            </div>
        }






        // template for card message 




    }

    const renderMessage = (returnedMessages) => {
        console.log(returnedMessages)
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
        // recording stopped

        // stop audio recorder
        recordAudio.stopRecording(function () {

            // after stopping the audio, get the audio data
            recordAudio.getDataURL(function (audioDataURL) {
                var files = {
                    audio: {
                        type: recordAudio.getBlob().type || 'audio/wav',
                        dataURL: audioDataURL
                    },
                    // project_id:'dinning-out'
                    project_id: projectId
                };
                // submit the audio file to the server
                socketio.emit('message', files);
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
        <>
            <h1>
                CHAT BOT
            </h1>

            <div style={{
                height: 700, width: 700,
                border: '3px solid black', borderRadius: '7px'
            }}>

                <div style={{ height: 644, width: '100%', overflow: 'auto' }}>


                    {msgArr.length !== 0 && renderMessage(msgArr)}


                </div>
                <input
                    style={{
                        margin: 0, width: '100%', height: 50,
                        borderRadius: '4px', padding: '5px', fontSize: '1rem'
                    }}
                    placeholder="Send a message..."
                    onKeyPress={keyPressHanlder}
                    type="text"
                />


            </div>

            <div >

                <div>
                    <button id="start-recording" onClick={startRecordingF} disabled={isRecording}>Start Recording</button>
                    <button id="stop-recording" onClick={stopRecordingF} disabled={!isRecording}>Stop Recording</button>
                </div>
            </div>

        </>

    )
}

export default Chatbot;
