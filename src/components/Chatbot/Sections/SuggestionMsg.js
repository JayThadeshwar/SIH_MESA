import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";


function SuggestionMsg({ suggestion, socketio }) {
    return (
        <>
            {suggestion && <div class="suggestion suggestion-0" data-ember-action="" data-ember-action-143="143" style={{ visibility: "visible", opacity: 1, transform: "translateX(0%)", margin: '5px 0 10px 0', color: 'white' }}>
                <div class="emoji-image" style={{ backgroundImage: "url(https://cdn.jsdelivr.net/emojione/assets/3.1.1/png/64/1f603.png)" }}></div>
                <div class="text">
                    <span id="ember144" class="ember-view">
                        {suggestion}
                    </span>
                </div>
                {suggestion && <button type='button' class="btn speaker" onClick={() => {
                    let payload = {
                        'text': suggestion,
                        'gender': 'FEMALE',
                        'language_code': 'en-IN',
                        'speed': 1
                    }
                    console.log(payload)
                    socketio.emit('tts-message', payload)
                }}></button>
                }                <div id="ember147" class="ripple-container ember-view"></div>
            </div>}
        </>
    )
}

export default SuggestionMsg