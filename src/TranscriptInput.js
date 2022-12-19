/* Testing file  */
import axios from "axios";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import VideoToAudio from "./components/common/VideoToAudio";

function Trial() {
  const [clientId, setClientId] = useState("");
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [videoFileTranscript, setVideoFileTranscript] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [audioName, setAudioName] = useState("");
  const [audio, setAudio] = useState();
  useEffect(() => {
    const socketiovar = io.connect("http://localhost:5001");
    socketiovar.on("sst_message", function (data) {
      setPlayVideo(true);
      console.log(data);
      setVideoFileTranscript((prev) => `${prev} ${data}`);
    });
    socketiovar.on("server_setup", function (data) {
      setClientId(data);
    });
    return () => {
      socketiovar.close();
    };
  }, []);

  async function convertToAudio(input) {
    setPlayVideo(false);
    let sourceVideoFile = input.files[0];
    let targetAudioFormat = "mp3";
    let convertedAudioDataObj = await VideoToAudio(
      sourceVideoFile,
      targetAudioFormat
    );
    console.log("converted");
    setVideoFilePath(URL.createObjectURL(input.files[0]));
    setVideoFileTranscript("");

    if (input.files[0]) {
      setAudio(convertedAudioDataObj.blob);
      setAudioName(input.files[0].name);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".mp4, .avi, .mov "
        onChange={(e) => {
          if (e.target.files[0].size > 1048576 * 40) {
            // 40MB
            alert("File is too big!");
            e.target.value = "";
          } else {
            convertToAudio(e.target);
          }
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          const data = new FormData();
          data.append("file", audio);
          data.append("filename", audioName);
          data.append("clientId", clientId);
          axios.post(
            "http://localhost:5001/api/dialogflow/audioTranscript",
            data
          );
        }}
      >
        Submit
      </button>
      <ReactPlayer
        url={videoFilePath}
        width="50%"
        height="50%"
        controls={true}
        playing={playVideo}
      />
      {videoFileTranscript}
    </div>
  );
}

export default Trial;
