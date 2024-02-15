import { atom } from "jotai";

import { NoteInfo } from "@shared/models";
import { dummyNotes } from "@/store/mocks";

export const notesAtom = atom<NoteInfo[]>(dummyNotes);
