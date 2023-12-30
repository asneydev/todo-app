"use  client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { UseRecorder } from "@/utils/types/recorderTypes";
import useRecorder from "@/utils/recordNote/useRecorder";
import useRecordingsList from "@/utils/recordNote/useRecordingList";
import { Note, NoteProps } from "@/app/types/types";
import { blobConverter } from "@/utils/blobConverter";

const INITIAL_NOTE_STATE = {
  id: Date.now(),
  title: "",
  description: "",
  audio: [],
};

export default function NoteModal({ isOpen, onClose, saveNote }: NoteProps) {
  const [note, setNote] = useState<Note>(INITIAL_NOTE_STATE);
  const { b64toBlob } = blobConverter();
  const {
    recorderState,
    startRecording,
    saveRecording,
    cancelRecording,
  }: UseRecorder = useRecorder();

  const { audio, recordingMinutes, recordingSeconds, initRecording } =
    recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

  useEffect(() => {
    setNote((prevState) => {
      return {
        ...prevState,
        audio: recordings,
      };
    });
  }, [recordings]);

  const handleSaveNote = () => {
    saveNote({ ...note, id: Date.now() });
    onClose();
    setNote(INITIAL_NOTE_STATE);
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add to-do</ModalHeader>
            <ModalBody>
              <h2 className="text-blue-500">Text note</h2>
              <Input
                label="Title"
                value={note.title}
                onChange={(event) =>
                  setNote((prevState) => ({
                    ...prevState,
                    title: event.target.value,
                  }))
                }
              />
              <Input
                label="Description"
                value={note.description}
                onChange={(event) =>
                  setNote((prevState) => ({
                    ...prevState,
                    description: event.target.value,
                  }))
                }
              />
              <Divider />
              <h2 className="text-blue-500">
                Audio note{" "}
                <span className="text-gray-600 text-xs">( Max 5 minutes )</span>
              </h2>
              {recordingMinutes}:{recordingSeconds}
              {initRecording && (
                <div className="cancel-button-container">
                  <button
                    className="cancel-button"
                    title="Cancel recording"
                    onClick={cancelRecording}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {initRecording ? (
                <Button
                  onPress={saveRecording}
                  isDisabled={recordingSeconds === 0}
                  color="success"
                  endContent={<p>{"#"}</p>}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onPress={startRecording}
                  color="primary"
                  endContent={<p>{">"}</p>}
                >
                  Start
                </Button>
              )}
            </ModalBody>
            <ModalFooter>
              {recordings.length > 0 ? (
                <>
                  <h1>Your recordings</h1>
                  <div className="recordings-list">
                    {recordings.map((record) => (
                      <div className="record" key={record.key}>
                        <audio
                          controls
                          src={window.URL.createObjectURL(
                            b64toBlob(record.audio)
                          )}
                        />
                        <div className="delete-button-container">
                          <button
                            className="delete-button"
                            title="Delete this audio"
                            onClick={() => deleteAudio(record.key)}
                          >
                            Delete audio
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-records">
                  <span>You do not have records</span>
                </div>
              )}

              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleSaveNote}
                isDisabled={!!note.title === false}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
