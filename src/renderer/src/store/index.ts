import { atom } from "jotai";
import { unwrap } from "jotai/utils";

import { NoteInfo } from "@shared/models";

const loadNotes = async () => {
  const notes = await window.context.getNotes();

  return notes.sort((a, b) => b.editedAt - a.editedAt);
};

const asyncNotesAtom = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes());

export const notesAtom = unwrap(asyncNotesAtom, (prev) => prev);
export const selectedNoteIndexAtom = atom<number | null>(null);

export const createNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);

  if (!notes) return;

  const title = `Notes ${notes.length + 1}`;

  const newNote: NoteInfo = {
    title,
    editedAt: Date.now(),
  };

  set(notesAtom, [
    newNote,
    ...notes.filter((note) => note.title != newNote.title),
  ]);

  set(selectedNoteIndexAtom, 0);
});

const asyncSelectedNoteAtom = atom(async (get) => {
  const notes = get(notesAtom);
  const selectedNoteIndex = get(selectedNoteIndexAtom);

  if (selectedNoteIndex == null || !notes) return null;

  const selectedNote = notes[selectedNoteIndex];

  const noteContent = await window.context.readNote(selectedNote.title);

  return {
    ...selectedNote,
    content: noteContent,
  };
});

export const selectedNoteAtom = unwrap(
  asyncSelectedNoteAtom,
  (prev) =>
    prev ?? {
      title: "",
      content: "",
      lastEditTime: Date.now(),
    }
);

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes) return;

  set(
    notesAtom,
    notes.filter((note) => note.title != selectedNote.title)
  );

  set(selectedNoteIndexAtom, null);
});
