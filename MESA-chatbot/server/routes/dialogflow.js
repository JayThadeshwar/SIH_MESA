const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');
const config = require('../config/dev.js');
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode
const fs = require('fs');
const util = require('util');
const sessionClient = new dialogflow.SessionsClient();
let sessionPath;



// Text Query Route

router.post('/textQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionClient.sessionPath(req.body.projectId, sessionId),
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
})
router.post('/audioQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    console.log('ssssssssssssssssssssssssss')
    console.log(req)
    console.log('ssssssssssssssssssssssssss')
    console.log(req.file)
    const request = {
        session: sessionPath,
        "queryInput": {
            "audioConfig": {
                audioEncoding: "AUDIO_ENCODING_MP3",
      sampleRateHertz: 16000,
    //   languageCode: languageCode,
              "languageCode": "en-US"
            }
          },
        "inputAudio":req.body.arrayBuffer
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    console.log(responses)
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
   

    res.send(result)
})



//Event Query Route

router.post('/eventQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session:sessionClient.sessionPath(req.body.projectId, sessionId) ,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };
    var aa;
    // fs.readFile("D:/CHAITANYA/web/React/chatbot-app/Recording.m4a", function(err, result) {
    //     console.log(result)
    //     console.log(err)
    //    aa= result.toString("base64");
    //   });
      const readFile = util.promisify(fs.readFile);
// const inputAudio = await readFile("D:/CHAITANYA/web/React/chatbot-app/Recording.m4a");

    // const request = {
    //     session: sessionPath,
    //     queryInput: {
    //       audioConfig: {
    //         audioEncoding: encoding,
    //         sampleRateHertz: sampleRateHertz,
    //         languageCode: languageCode,
    //       },
    //     },
    //     inputAudio: inputAudio,
    //   };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    // console.log(responses1)
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    

    res.send(result)
})







module.exports = router;
