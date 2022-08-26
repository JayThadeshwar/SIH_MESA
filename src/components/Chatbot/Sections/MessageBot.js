import React, { useEffect } from 'react'

export default function MessageBot({ msg, text, translation, isTranslate, isConvo, langCode }) {
  useEffect(() => {
    // console.log(msg)

    return () => {

    }
  }, [])

  return (
    <div class={msg} style={{ display: "block" }}>
      {/* <div class="conversation-item conversation-item-0-0 bot" style={{ display: "block" }}> */}
      <div class="assistant" data-ember-action="" data-ember-action-138="138" style={{ visibility: "visible", opacity: 1, transform: "translateX(0%)" }}>
      </div><div class="bubble" data-ember-action="" data-ember-action-139="139" style={{ opacity: 1 }}>
        <div class="bubble-inner ">
          <div class="text">
            <span id="ember140" class="ember-view">{text}
            </span>

          </div>

          {translation && isTranslate && <div class="translation is-light">
            <span id="ember141" class="ember-view">{translation}
            </span>                            </div>}

          <div class="dot-loader dot-loader-bounce">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
