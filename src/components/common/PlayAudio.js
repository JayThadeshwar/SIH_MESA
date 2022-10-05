function playOutput(arrayBuffer) {
    let audioContext = new AudioContext();
    let outputSource;
    try {
        if (arrayBuffer.byteLength > 0) {
            audioContext.decodeAudioData(arrayBuffer,
                function (buffer) {
                    audioContext.resume();
                    outputSource = audioContext.createBufferSource();
                    outputSource.connect(audioContext.destination);
                    outputSource.buffer = buffer;
                    outputSource.start(0);
                },
                function () {
                    console.log(arguments);
                });
        }
    } catch (e) {
        console.log(e);
    }
}
export default playOutput;