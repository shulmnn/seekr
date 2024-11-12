"use client";

import { useRecordVoice } from "~/hooks/useRecordVoice";

export default function Microphone() {
  const { startRecording, stopRecording, text } = useRecordVoice();

  return (
    // Button for starting and stopping voice recording
    <>
      <button
        onMouseDown={startRecording} // Start recording when mouse is pressed
        onMouseUp={stopRecording} // Stop recording when mouse is released
        onTouchStart={startRecording} // Start recording when touch begins on a touch device
        onTouchEnd={stopRecording} // Stop recording when touch ends on a touch device
        className="w-10 select-none border-none bg-transparent"
      >
        push to talk
      </button>
      <p>{text}</p>
    </>
  );
}
