"use client";

import { useRecordVoice } from "~/hooks/useRecordVoice";

export default function Microphone() {
  const { startRecording, stopRecording } = useRecordVoice();

  return (
    // Button for starting and stopping voice recording
    <>
      <button
        onMouseDown={startRecording} // Start recording when mouse is pressed
        onMouseUp={stopRecording} // Stop recording when mouse is released
        onTouchStart={startRecording} // Start recording when touch begins on a touch device
        onTouchEnd={stopRecording} // Stop recording when touch ends on a touch device
        className="select-none rounded-full border-none bg-neutral-200 bg-transparent px-4 py-2 text-neutral-800 active:bg-red-600 active:text-white"
      >
        push to talk
      </button>
    </>
  );
}
