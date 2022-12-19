import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RecordRTC from "recordrtc";
function HindiTrial() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordAudio, setrecordAudio] = useState();
  useEffect(() => {
    const socketiovar = io.connect("http://localhost:5001");
    socketiovar.on("connect", function () {
      console.log("connected");
    });
    socketiovar.on("results", function (data) {
      console.log(data);
    });
    return () => {
      socketiovar.close();
    };
  }, []);

  function stopRecordingF() {
    setIsRecording(false);
    recordAudio.stopRecording(function () {
      // after stopping the audio, get the audio data
      recordAudio.getDataURL(function (audioDataURL) {
        var files = {
          audio: {
            type: recordAudio.getBlob().type || "audio/wav",
            dataURL: audioDataURL,
          },
          // project_id:'dinning-out'
          project_id: "stt-ewll",
          language_code: "hi",
          output_langCode: "mr",
        };
        // submit the audio file to the server
        socketio.emit("message_translate", files);
      });
    });
  }
  function startRecordingF() {
    // recording started
    setIsRecording(true);

    // make use of HTML 5/WebRTC, JavaScript getUserMedia()
    // to capture the browser microphone stream
    navigator.getUserMedia(
      {
        audio: true,
      },
      function (stream) {
        let rrecordAudio = RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm",
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
          desiredSampRate: 16000,
        });

        rrecordAudio.startRecording();
        setrecordAudio(rrecordAudio);
      },
      function (error) {
        console.error(JSON.stringify(error));
      }
    );
  }
  return (
    <div>
      <div>
        <button
          id="start-recording"
          onClick={startRecordingF}
          disabled={isRecording}
        >
          Start Recording
        </button>
        <button
          id="stop-recording"
          onClick={stopRecordingF}
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
}

export default HindiTrial;
