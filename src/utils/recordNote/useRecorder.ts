import { useState, useEffect } from "react";
import {
  AudioTrack,
  Interval,
  MediaRecorderEvent,
  Recorder,
} from "../types/recorderTypes";
import { saveRecording, startRecording } from "./controllers";
import { blobConverter } from "../blobConverter";

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};
const MAX_RECORDER_TIME = 5;

export default function useRecorder() {
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [recorderState, setRecorderState] = useState<Recorder>(initialState);
  const { blobToBase64 } = blobConverter();

  useEffect(() => {
    let recordingInterval: Interval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            typeof recordingInterval === "number" &&
              clearInterval(recordingInterval);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
          else return prevState;
        });
      }, 1000);
    else
      typeof recordingInterval === "number" && clearInterval(recordingInterval);

    return () => {
      typeof recordingInterval === "number" && clearInterval(recordingInterval);
    };
  });

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      else return prevState;
    });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: Blob[] = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

        const audioRecord = (await blobToBase64(blob)) as string;

        chunks = [];
        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: audioRecord,
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop());
    };
  }, [recorderState.mediaRecorder, blobToBase64]);

  return {
    recorderState,
    isRecording,
    startRecording: () => {
      setIsRecording(true);
      startRecording(setRecorderState);
    },
    cancelRecording: () => {
      setRecorderState(initialState);
      setIsRecording(false);
    },
    saveRecording: () => {
      saveRecording(recorderState.mediaRecorder);
      setIsRecording(false);
    },
  };
}
