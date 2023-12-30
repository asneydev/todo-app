import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Audio } from "../types/recorderTypes";

export default function useRecordingsList(audio: string | null) {
  const [recordings, setRecordings] = useState<Audio[]>([]);

  useEffect(() => {
    if (audio)
      setRecordings((prevState: Audio[]) => {
        return [...prevState, { key: JSON.stringify(Date.now()), audio }];
      });
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
  };
}

export function deleteAudio(
  audioKey: string,
  setRecordings: Dispatch<SetStateAction<Audio[]>>
) {
  setRecordings((prevState: Audio[]) =>
    prevState.filter((record) => record.key !== audioKey)
  );
}
