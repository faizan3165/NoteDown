import { NoteContent, NoteInfo } from "./models";

export type GetNotes = () => Promise<NoteInfo[]>;
export type CreateNote = () => Promise<NoteInfo["title"] | false>;
export type ReadNote = (title: NoteInfo["title"]) => Promise<NoteContent>;

export type DeleteNote = (
  title: NoteInfo["title"]
) => Promise<boolean | undefined>;

export type WriteNote = (
  title: NoteInfo["title"],
  content: NoteContent
) => Promise<void>;
