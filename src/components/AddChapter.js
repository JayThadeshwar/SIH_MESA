import React, { useState, useEffect } from 'react'
import Footer from './common/Footer/Footer'
import Navbar from './common/Navbar/Navbar'
// import TextField from '@mui/material/TextField';
import * as con from '../constants';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../utility/LoadingSpinner";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import VideoToAudio from './common/VideoToAudio';
import io from 'socket.io-client';
import ReactPlayer from "react-player";

const socketio = io.connect("http://localhost:5001");

const AddChapter = () => {

  const [values, setValues] = useState({
    name: '',
    content: ''
  });
  const [typeBtn, setTypeBtn] = useState(null)
  const navigate = useNavigate();
  const [hasErr, sethasErr] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const [showContent, setShowContent] = useState(false);
  const [content, setContent] = useState('');

  const [clientId, setClientId] = useState("");
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [audioName, setAudioName] = useState("");
  const [audio, setAudio] = useState();
  const [getContentBtnDisabled, setGetContentBtnDisabled] = useState(false);

  useEffect(() => {
    socketio.on('sst_message', function (data) {
      setPlayVideo(true)
      console.log(data);
      setContent(data);
      setShowContent(true);
    });
    socketio.on('server_setup', function (data) {
      setClientId(data)
    });
    return () => {
      socketio.close()
    }
  }, []);
  async function convertToAudio(input) {
    setGetContentBtnDisabled(true)
    setPlayVideo(false)
    setShowContent(false)
    let sourceVideoFile = input.files[0];
    let targetAudioFormat = 'mp3'
    let convertedAudioDataObj = await VideoToAudio(sourceVideoFile, targetAudioFormat);
    setVideoFilePath(URL.createObjectURL(input.files[0]));
    setGetContentBtnDisabled(false)
    if (input.files[0]) {
      setAudio(convertedAudioDataObj.blob);
      setAudioName(input.files[0].name);
    }
    console.log('converted')
  }
  const handleChangeForm = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setLoad(true);
    event.preventDefault();
    let requestOptions = {}
    if (typeBtn == 'text') { } else if (typeBtn == 'link') {
      var video_id = videoLink.split("v=")[1].substring(0, 11);

      fetch(con.BASE_URI + '/video?id=' + video_id).then((res) => {
        res.json().then((resp) => {
          setContent(resp.content);
          setShowContent(true);
        })
      });
    } else if (typeBtn == 'input') {
      event.preventDefault();
      const data = new FormData()
      data.append('file', audio)
      data.append('filename', audioName)
      data.append('clientId', clientId)
      data.append('langCode', JSON.parse(localStorage.getItem('voice_origin'))['value'])
      axios.post('http://localhost:5001/api/dialogflow/audioTranscript', data)

    } else {
      uploadFile(event)
    }
    setLoad(false);
  };

  const handleSubmitMain = (event) => {
    console.log("HEREEEEe:" + content)
    setLoad(true)
    var requestOptions = {}
    if (typeBtn == 'text') {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          name: values.name,
          content: message
        })
      };

      fetch(con.BASE_URI + "/chapters", requestOptions)
        .then(
          response => {
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
    } else {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          name: values.name,
          content: content
        })
      };

      fetch(con.BASE_URI + "/chapters", requestOptions)
        .then(
          response => {
            setLoad(false)
            console.log(response)
            if (response.status === 201)
              navigate("/home");
            else
              sethasErr(true)
          }).catch(err => {
            setLoad(false)
            console.log(err)
            sethasErr(true)
          })
    }
  }

  const btnOptions = [
    { title: "Text", label_id: "text" },
    { title: "Input", label_id: "input" },
    { title: "Link", label_id: "link" },
    { title: "Image", label_id: "image" },
    { title: "Pdf", label_id: "pdf" },
  ]

  function try1(e) {
    e.preventDefault()
    setTypeBtn(e.target.id)
    setVideoFilePath(null)
    setShowContent(false)
  }

  const handleMessageChange = event => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };

  const handleVideoChange = event => {
    console.log('Hello')
    console.log(event.target.value);
    setVideoLink(event.target.value);
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("url", "URL-of-Image-or-PDF-file");
    formData.append("language", "eng");
    formData.append("apikey", "K89640252288957");
    formData.append("isOverlayRequired", true)
    try {
      const res = await axios.post(
        "https://api.ocr.space/parse/image",
        formData
      );
      let brve = values.content

      setContent(brve + "\n" + res.data.ParsedResults[0]?.ParsedText || "" + "\n" + res.data.ParsedResults[1]?.ParsedText || "" + "\n" + res.data.ParsedResults[2]?.ParsedText || "" + "\n")
      setShowContent(true)
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="addChaper">
      <Navbar />
      {hasErr ?
        <>
          <Alert severity="error">
            Unable to add chapter, please try again.
          </Alert><br />
        </>
        : <></>}
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
                        typeBtn === 'link' &&
                        (
                          <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                            <label for="videoLink" className="form-label fs-3">Enter Video Link<code>*</code></label>
                            <input
                              type="link"
                              className="form-control"
                              id="videoLink"
                              aria-describedby="videoLink"
                              placeholder="URL"
                              onChange={handleVideoChange}
                            />
                          </div>
                        )
                      }
                      {
                        typeBtn === 'input' &&
                        (
                          <div style={{ margin: '15px 0px' }}>
                            <div>
                              <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                                <label for="imageUpload" className="form-label fs-3">Upload Video<code>*</code></label>
                                <input
                                  type="file"
                                  accept=".mp4, .avi, .mov "
                                  className="form-control w-75"
                                  id="inputUpload"
                                  aria-describedby="inputUpload"
                                  placeholder="Select File"
                                  onChange={(e) => {
                                    if (e.target.files[0].size > (1048576 * 40)) { // 40MB
                                      alert("File is too big!");
                                      e.target.value = "";
                                    } else {
                                      convertToAudio(e.target)
                                    }
                                  }}
                                />
                              </div>
                              <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing={playVideo} />
                              <small>Note: Configure Voice assistant's origin settings to get appropriate content transcription</small>
                            </div>
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
                              onChange={saveFile}
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
                              onChange={saveFile}
                            />
                          </div>
                        )
                      }

                      {
                        showContent &&
                        (
                          <div className="mb-3" style={{ "margin": "30px 0px", "padding": "0px" }}>
                            <label for="exampleFormControlTextarea1" className="form-label fs-3">Chapter Content<code>*</code></label>
                            <textarea className="form-control"
                              id="exampleFormControlTextarea1" rows="8" value={content}> </textarea>
                          </div>
                        )
                      }

                      <div className="mt-5 d-flex justify-content-between">
                        <button type="button" class="btn btn-primary btn-lg " onClick={handleSubmit} disabled={getContentBtnDisabled}>GET CONTENT</button>
                        <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmitMain}>ADD</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )
        }
      </div>
      <Footer />

    </div>
  )
}

export default AddChapter