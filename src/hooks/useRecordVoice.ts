"use client";
import { useEffect, useRef, useState } from "react";
import { blobToBase64 } from "~/utils/blobToBase64";
import { createMediaStream, getPeakLevel } from "~/utils/createMediaStream";

// Note: React Strict Mode can cause the microphone to initiate recording twice, resulting in an InvalidStateError

export const useRecordVoice = () => {
  // state to hold media recorder instance
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );

  // state to track whether recording is currently in progress
  const [recording, setRecording] = useState<boolean>(false);

  // state to save text
  const [text, setText] = useState<string>("");

  // ref to store audio chunks during recording
  const chunks = useRef<Blob[]>([]);

  // ref to store currect state of recording
  const isRecording = useRef(false);

  // function to start the recording
  const startRecording = () => {
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    }
  };

  // function to stop the recording
  const stopRecording = () => {
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  // send request to our own api to convert voice-to-text
  // we use undefind here, because in blobToBase64 function
  // can return undefind while reading data
  const getText = async (base64data: string | undefined) => {
    try {
      const response = await fetch("/api/speechToText", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      }).then((res) => res.json());

      const { text } = response;
      setText(text);
    } catch (error) {
      console.log(error);
    }
  };

  // function to initialize media recorder
  const initMediaRecorder = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);

    // event handler when function start
    mediaRecorder.onstart = () => {
      // clear the chunk array
      createMediaStream(stream, isRecording.current);
      chunks.current = [];
    };

    // event handler when data becomes available during recording
    mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      // store data in chunks
      chunks.current.push(ev.data);
    };

    // event handler when recording stops
    mediaRecorder.onstop = () => {
      // create a blob from all collected chunks
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getText);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initMediaRecorder);
    }
  }, []);

  return { recording, startRecording, stopRecording, text };
};
