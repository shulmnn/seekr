"use client";

import Microphone from "~/components/Microphone";
import { useRecordVoice } from "~/hooks/useRecordVoice";

export default function Page() {
  const { text } = useRecordVoice();
  return (
    <div className="flex min-h-dvh flex-col p-4">
      <h1>Seekr voice helper</h1>
      <div className="flex flex-grow items-center justify-center">{text}</div>
      <div className="flex h-12 items-center justify-center">
        <Microphone />
      </div>
    </div>
  );
}
