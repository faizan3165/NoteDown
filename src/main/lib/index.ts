import { homedir } from "os";
import { ensureDir, readFile, readdir, stat } from "fs-extra";

import { appDirName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { GetNotes, ReadNote } from "@shared/types";

export const getRootDir = () => {
  return `${homedir()}\\${appDirName}`;
};

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const noteNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  });

  const notes = noteNames.filter((note) => note.endsWith(".md"));

  return Promise.all(notes.map(getNoteInfo));
};

export const getNoteInfo = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}\\${fileName}`);

  return {
    title: fileName.replace(/\.md$/, ""),
    editedAt: fileStats.mtimeMs,
  };
};

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir();

  return await readFile(`${rootDir}\\${fileName}.md`, {
    encoding: fileEncoding,
  });
};
