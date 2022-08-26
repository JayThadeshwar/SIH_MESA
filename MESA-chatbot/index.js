const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const fs = require('fs');
const tts = require('google-translate-tts');
const translate = require('@iamtraction/google-translate');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/dialogflow', require('./server/routes/dialogflow'));
console.log(translate)
const googleTTS = require('google-tts-api');

// load all the libraries for the Dialogflow part
const uuid = require('uuid');
const df = require('dialogflow').v2beta1;
var server;
var sessionId, sessionClient, sessionPath, request;
server = http.createServer(app);
const port = 5001;
io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
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
        "languageCode": langCode
      }
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
  client.emit('server_setup', `Server connected [id=${client.id}]`);

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
});




server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
