import googletrans
from googletrans import Translator

import requests
import json

def summarizemethod(content):
    url = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

    mxLen = len(content) * 0.25
    mnLen = len(content) * 0.1
    if(mxLen > 1024):
        mxLen = 720
        mnLen = 300
    

    payload = json.dumps({
    "inputs": content,
    "parameters": {
        "min_length": int(mnLen),
        "max_length": int(mxLen)
    }
    })
    headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    }


    response = requests.request("POST", url, headers=headers, data=payload)
    data = json.loads(response._content)

    print("Summary length:", len(data))
    summary_text = data[0]['summary_text']
    translator = Translator()
    
    translated_text = translator.translate(summary_text, src='en', dest='hi') 
    resp = {"summary": summary_text, "translation":translated_text.text}
    
    return resp