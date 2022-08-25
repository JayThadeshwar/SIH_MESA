import React from 'react'

export default function MessageHuman({msg,text}) {
    return (
        <div class={msg} style={{ display: "block" }}>
            <div class="bubble" style={{ opacity: 1 }}>
                <div class="bubble-inner">
                    <div class="text">
                        <span>{text}</span>
                        </div>
                </div>
            </div><div style={{ width: '50px', height: '50px', borderRadius: '25px', visibility: 'visible', opacity: 1, transform: 'translateX(0%)' }} id="ember160" class="avatar avatar-profile-pic avatar-default ember-view"></div>
        </div>
    )
}
