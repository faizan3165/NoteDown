import { atom } from "jotai";

import { NoteInfo } from "@shared/models";
import { dummyNotes } from "@/store/mocks";

export const notesAtom = atom<NoteInfo[]>(dummyNotes);
export const selectedNoteIndexAtom = atom<number | null>(null);

export const createNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);

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

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const selectNoteIndex = get(selectedNoteIndexAtom);

  if (selectNoteIndex == null) return null;

  const selectedNote = notes[selectNoteIndex];

  return {
    ...selectedNote,
    content: `Hello from note number ${selectNoteIndex}`,
  };
});

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote) return;

  set(
    notesAtom,
    notes.filter((note) => note.title != selectedNote.title)
  );

  set(selectedNoteIndexAtom, null);
});
