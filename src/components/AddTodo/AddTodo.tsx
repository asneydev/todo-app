"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import NoteModal from "../NoteModal/NoteModal";
import { Note } from "@/app/types/types";
import { storage } from "@/utils/storage";
import { TODO_KEY } from "@/config/storageKeys";

export const AddTodo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSaveNote = (note: Note) => {
    const currentNotes = storage.get(TODO_KEY);

    storage.set(TODO_KEY, [...currentNotes, note]);
  };

  return (
    <>
      <Button color="primary" variant="solid" onPress={() => onOpen()}>
        Add
      </Button>
      <NoteModal isOpen={isOpen} onClose={onClose} saveNote={onSaveNote} />
    </>
  );
};
