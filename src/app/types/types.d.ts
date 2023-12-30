import { Audio } from "@/utils/types/recorderTypes";

export type Todo = {
  id?: string | number;
  title: string;
  description: string;
  done: boolean;
  priority: "low" | "medium" | "height";
  audio: Audio[];
};

export type Note = {
  id: number;
  title: string;
  description: string;
  audio: Audio[];
};

export type NoteProps = {
  isOpen: boolean;
  onClose: () => void;
  saveNote: (note: Note) => void;
};
