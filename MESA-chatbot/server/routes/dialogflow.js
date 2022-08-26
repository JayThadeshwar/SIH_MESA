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
const translate = require('@iamtraction/google-translate');



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
router.post('/jsonConvertor', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    data1 = {}

    bl = false
    let data = {
        "headline": "Multilingual Education System",
        "tagline": "The free, fun and effective way of learning English",
        "start": "GET STARTED",
        "login": "ALREADY HAVE AND ACCOUNT",
        "target": "Learn",
        "MyChap": "MY CHAPTERS",
        "AddChap": "ADD CHAPTER",
        "Activity": "ACTIVITIES",
        "Welcome": "Welcome",
        "Email": "Email Id",
        "Password": "Password",
        "loginAccount": "LOGIN",
        "NoAccount": "Don't have an account?",
        "Register": "Register",
        "MESA": "MESA",
        "copyright": "&copy; 2022 MESA. All rights reserved",
        "Search": "Search",
        "Action": "Action",
        "Another_action": "Another action",
        "Mitra": "Chat with your Mitra!",
        "MitraInfo": "Start talking to your Mitra. He will never judge you whatever the way you speak. He will be your best friend preparing you to speak with confidence. Just chat with your bot..!",
        "Register_Here": "Register Here!",
        "FullName": "Full Name",
        "UserName": "User Name",
        "EmailAddress": "Email Address",
        "AlreadyRegistered": "Already have an account?",
        "Word": "Word:",
        "WordTrans": "Translation of Word:",
        "Definition": "Definition:",
        "Synonyms": "Synonyms:",
        "Antonyms": "Antonyms:",
        "Example": "Example:",
        "Back": "BACK",
        "Proceed": "PROCEED",
        "Game1": "Mix & Match",
        "Game1_def": "Mix and Match is a brain training puzzle game where you need to colour each tile according to the category it fits into.",
        "Game2": "Flying Balloon",
        "Game2_def": "Burst the balloon based on the hints and learn your way upto the sky",
        "Play": "Play Now",
        "Assessment": "Assessment",
        "ChapterEnd": "END CHAPTER",
        "Reset": "RESET",
        "Submit": "SUBMIT",
        "Grammar": "Grammatical Understanding",
        "POS": "Parts of speech information",
        "SVO": "Subject Verb Object information",
        "Upload": "Upload",
        "NoChapAdd": "Unable to add chapter, please try again.",
        "ChapName": "Chapter Name"
    }
    console.log(Object.entries(data).length)

    let count = 0;
    for (let [key, value] of Object.entries((data))) {
        // alert(value);
        // console.log(value)
        translate(value, { from: 'en', to: req.body.toLang }).then(async res1 => {
            count = count + 1
            // console.log(res1.text)
            data1[key] = res1.text
            console.log(count)
            if (count === Object.entries(data).length) {
                console.log(data1)
                bl = true
                let data = JSON.stringify(data1);
                fs.mkdirSync(`D:/CHAITANYA/web/React/25082022/SIH_MESA/public/assets/locales/${req.body.toLang}`);
                fs.writeFileSync(`D:/CHAITANYA/web/React/25082022/SIH_MESA/public/assets/locales/${req.body.toLang}/translation.json`, data);

                res.send(true)
            }

        }).catch((err) => {
            console.log(err)
            // res.send(null)
        });
    }

    if (bl) {
        print('l')
        // res.send({ data: data1 })
    } else {
        print('m')
        // res.send(null)
    }

})
router.post('/audioQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
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
        "inputAudio": req.body.arrayBuffer
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

router.post('/eventQuery', async (req, res1) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionClient.sessionPath(req.body.projectId, sessionId),
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
    // responses[0].translation=

    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.fulfillmentText !== "") {
        translate(result.fulfillmentText, { from: 'en', to: 'hi' }).then(res => {
            console.log(res.text); // OUTPUT: Je vous remercie
            console.log(res.from.autoCorrected); // OUTPUT: true
            console.log(res.from.text.value); // OUTPUT: [Thank] you
            console.log(res.from.text.didYouMean); // OUTPUT: false
            result.translateFulfillmentText = res.text
            //   client.emit('results', results);
            res1.send(result)
        }).catch(err => {
            console.error(err);
            res1.send("Error occured")
        });
    }
    // console.log(  result.translateFulfillmentText)



})







module.exports = router;
