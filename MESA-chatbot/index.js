const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('http');
const cors = require('cors');
const path = require("path");
const { Server } = require('socket.io');
const translate = require('@iamtraction/google-translate');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/dialogflow', require('./server/routes/dialogflow'));
// console.log(translate)
const googleTTS = require('google-tts-api');
const textToSpeech = require('@google-cloud/text-to-speech');
const speech = require('@google-cloud/speech');
const client = new textToSpeech.TextToSpeechClient();
// app.use(upload.array()); 
app.use(express.static('public'));
var multer = require('multer');
var upload = multer();
// Creates a client
const client_stt = new speech.SpeechClient();
const uuid = require('uuid');
const df = require('dialogflow').v2beta1;
var server;
var sessionId, sessionClient, sessionPath, request;
server = http.createServer(app);
const port = 5001;
const router = require("../MESA-chatbot/server/routes/dialogflow")
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const { Storage } = require("@google-cloud/storage");
const bucket_name = "mesa-video-bucket"
const gc = new Storage({
  keyFilename: path.join(__dirname, "maptest-362211-f96658b8509f.json"),
  projectId: "maptest-362211"
});
// gc.getBuckets().then(x=>console.log(x))
const mesaVideoBucket = gc.bucket(bucket_name);

function setupDialogflow(projectid, langCode) {
  sessionId = uuid.v4();
  sessionClient = new df.SessionsClient();
  sessionPath = sessionClient.sessionPath(projectid, sessionId);
  request = {
    session: sessionPath,
    queryInput: {
      "audioConfig": {
        "audioEncoding": "AUDIO_ENCODING_LINEAR_16",
        "sampleRateHertz": 16000,
        "languageCode": "en-IN",
      },

    }
  }
}
function setupDialogflowTranslate(projectid, langCode) {
  sessionId = uuid.v4();
  sessionClient = new df.SessionsClient();
  sessionPath = sessionClient.sessionPath(projectid, sessionId);
  request = {
    session: sessionPath,
    queryInput: {
      "audioConfig": {
        "audioEncoding": "AUDIO_ENCODING_LINEAR_16",
        "sampleRateHertz": 16000,
        "languageCode": langCode
      }
    }
  }
}

async function detectIntent(audio) {
  request.inputAudio = audio;
  const responses = await sessionClient.detectIntent(request);
  return responses;
}
io.on('connect', (client) => {
  console.log(`Client connected [id=${client.id}]`);
  client.emit('server_setup', client.id);
  // when the client sends 'message' events
  // when using simple audio input
  client.on('message', async function (data) {
    // we get the dataURL which was sent from the client
    const dataURL = data.audio.dataURL.split(',').pop();
    let projectId = data.project_id;
    let fromLangCode = data.fromLangCode;
    let toLangCode = data.toLangCode;
    setupDialogflow(projectId, fromLangCode)
    // we will convert it to a Buffer
    let fileBuffer = Buffer.from(dataURL, 'base64');
    // run the simple detectIntent() function
    let results = await detectIntent(fileBuffer);
    console.log('------------------------------------------------------------')
    console.log(results)
    console.log(results[0].queryResult.fulfillmentText)
    console.log('------------------------------------------------------------')
    if (results[0].queryResult.fulfillmentText !== "") {
      translate(results[0].queryResult.fulfillmentText, { from: fromLangCode, to: toLangCode }).then(res => {
        // console.log(res.text); // OUTPUT: Je vous remercie
        // console.log(res.from.autoCorrected); // OUTPUT: true
        // console.log(res.from.text.value); // OUTPUT: [Thank] you
        // console.log(res.from.text.didYouMean); // OUTPUT: false
        results[0].queryResult.translateFulfillmentText = res.text
        client.emit('results', results);
      }).catch(err => {
        console.error(err);
      });
    }
  });
  client.on('message_translate', async function (data) {
    // we get the dataURL which was sent from the client
    const dataURL = data.audio.dataURL.split(',').pop();
    let projectId = data.project_id;
    let langCode = data.language_code;
    let output_langCode = data.output_langCode;
    setupDialogflowTranslate(projectId, langCode)
    // we will convert it to a Buffer
    let fileBuffer = Buffer.from(dataURL, 'base64');
    // run the simple detectIntent() function
    let results = await detectIntent(fileBuffer);
    console.log('------------------------------------------------------------')
    console.log(results)
    console.log(results[0].queryResult.queryText)
    console.log('------------------------------------------------------------')
    if (results[0].queryResult.queryText !== "") {
      translate(results[0].queryResult.queryText, { from: langCode, to: output_langCode }).then(async res => {
        console.log(res.text); // OUTPUT: Je vous remercie
        // console.log(res.from.autoCorrected); // OUTPUT: true
        // console.log(res.from.text.value); // OUTPUT: [Thank] you
        // console.log(res.from.text.didYouMean); // OUTPUT: false
        results[0].queryResult.translateQueryText = res.text
        googleTTS
          .getAudioBase64(res.text, {
            lang: output_langCode,
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
          })
          .then((res) => {
            var buffer1 = Buffer.from(res, 'base64');
            console.log(buffer1)
            results[0].outputAudio = buffer1
            client.emit('results', results);
          }) // base64 text
          .catch(console.error);

      }).catch(err => {
        console.error(err);
      });
    }
  });
  client.on('tts-message', async function (payload) {
    // console.log(payload)
    textToAudioBuffer(payload).then(function (results) {
      console.log(results);
      client.emit('results-tts', results);
    }).catch(function (e) {
      console.log(e);
    });
  });
});
/*
 * TTS text to an audio buffer
 * @param text - string written text
 */
async function textToAudioBuffer(payload) {
  const request = {
    input: {
      text: payload['text']
    },
    voice: { languageCode: payload['language_code'], ssmlGender: payload['gender'] },
    audioConfig: { audioEncoding: 'MP3', "speakingRate": payload['speed'] },
  };
  // Performs the Text-to-Speech request
  const response = await client.synthesizeSpeech(request);
  return response[0].audioContent;
}
router.post('/audioTranscript', upload.single('file'), async (req, res) => {
  console.log('----')
  // console.log(req.file);
  const config = {
    encoding: 'AUDIO_ENCODING_MP3',
    sampleRateHertz: 16000,
    languageCode: req.body.langCode || "en-US",
  };

  const blob = mesaVideoBucket.file(req.body.clientId + '-' + req.body.filename)
  const blobStream = blob.createWriteStream()
  blobStream.end(req.file.buffer).on('finish', async () => {
    console.log('Added to gcs')
    const gcsUri = 'gs://' + bucket_name + '/' + req.body.clientId + '-' + req.body.filename;
    const request = {
      audio: { uri: gcsUri },
      config: config,
    };
    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client_stt.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    const transcription = response.results
      .map(result => result.alternatives[0].transcript).join(' ')
    // console.log(`Transcription: ${transcription}`);
    io.to(req.body.clientId).emit('sst_message', transcription)
    const storage = new Storage();
    try {
      await storage.bucket(bucket_name).file(req.body.clientId + '-' + req.body.filename).delete();
      console.log(`Deleted from gcs`);
      console.log('----')
    } catch (error) {
      console.log(error)
    }
  })
  res.send(true)
});

server.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
