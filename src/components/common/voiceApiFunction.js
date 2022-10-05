function voicePostFunction() {
    let payload = {
        speed: localStorage.getItem('voice_speed'),
        language_code: JSON.parse(localStorage.getItem('voice_origin'))['value'],
        gender: localStorage.getItem('voice_gender')
    }
    return payload
}

export default { voicePostFunction };