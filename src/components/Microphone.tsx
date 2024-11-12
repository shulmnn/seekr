"use client";

import { useEffect } from "react";
import { useRecordVoice } from "~/hooks/useRecordVoice";

interface MicrophoneProps {
  startRecording: () => void;
  stopRecording: () => void;
}

export default function Microphone({
  startRecording,
  stopRecording,
}: MicrophoneProps) {
  return (
    <>
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className="select-none rounded-full border-none bg-neutral-200 bg-transparent px-4 py-2 text-neutral-800 active:bg-red-600 active:text-white"
      >
        push to talk
      </button>
    </>
  );
}
