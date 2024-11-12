// function to calculate the peak level from the analyzer data
const getPeakLevel = (analyzer: AnalyserNode) => {
  // create uint8 array to store data
  const array = new Uint8Array(analyzer.fftSize);
  // read the time-domain data (waveform) of current audio processed by analyzer and store it in the array
  analyzer.getByteTimeDomainData(array);

  // normalized peak level
  return array.reduce(
    (max, current) => Math.max(max, Math.abs(current - 127), 0) / 128,
  );
};

const createMediaStream = (
  stream: MediaStream,
  isRecording: boolean,
  callback?: (peak: number) => void,
) => {
  // create new audio context
  const context = new AudioContext();

  // create a media stream source node from the input stream
  const source = context.createMediaStreamSource(stream);

  // create an analyzer node for audio analysis
  const analyzer = context.createAnalyser();

  // connect the source node to the analyzer node
  source.connect(analyzer);

  // function to continuously analyze audio data and invoke the callback
  const tick = () => {
    // calculate the peak level
    const peak = getPeakLevel(analyzer);

    // because we can't init createMediaStream function without callback
    // I decided to make it optional and then inside generate its own callback
    if (isRecording && callback) {
      callback(peak);
    }

    if (isRecording) {
      // browser will schedule the tick event to execute before next repaint event, typically
      // is is redrawn 60 times per second
      requestAnimationFrame(tick);
    }
  };

  // start the loop
  tick();
};

export { getPeakLevel, createMediaStream };
