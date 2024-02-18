import { homedir } from "os";
import {
  ensureDir,
  readFile,
  readdir,
  remove,
  stat,
  writeFile,
} from "fs-extra";
import { dialog } from "electron";
import path from "path";

import { appDirName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types";

export const getRootDir = () => {
  return path.join(homedir(), appDirName);
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
  const fileStats = await stat(path.join(getRootDir(), fileName));

  return {
    title: path.basename(fileName, ".md"),
    editedAt: fileStats.mtimeMs,
  };
};

export const readNote: ReadNote = async (fileName) => {
  return await readFile(path.join(getRootDir(), `${fileName}.md`), {
    encoding: fileEncoding,
  });
};

export const writeNote: WriteNote = async (fileName, content) => {
  console.log(`Writing note ${fileName}`);

  return await writeFile(path.join(getRootDir(), `${fileName}.md`), content, {
    encoding: fileEncoding,
  });
};

export const createNote = async () => {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: "Creating New Note",
    defaultPath: path.join(rootDir, "untitled.md"),
    buttonLabel: "Save",
    properties: ["showOverwriteConfirmation"],
    showsTagField: false,
    filters: [
      {
        name: "Markdown",
        extensions: ["md"],
      },
    ],
  });

  if (canceled || !filePath) {
    console.info("Note Creation cancelled");
    return false;
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath);

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: "error",
      title: "Creation Failed",
      message: `All notes must be saved under ${rootDir}, avoid using other directories`,
    });

    return false;
  }

  console.info(`Creating note at: ${filePath}`);

  await writeFile(filePath, "");

  return fileName;
};

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir();

  const { response } = await dialog.showMessageBox({
    type: "warning",
    title: `Delete ${fileName}`,
    message: "Are You Sure You Want to Delete The Current File?",
    buttons: ["Delete", "Cancel"],
    defaultId: 1,
    cancelId: 1,
  });

  if (response === 1) {
    console.info("Note deletion cancelled");

    return false;
  }

  console.log("====================================");
  console.log(`${fileName} deleted successfully`);
  console.log("====================================");

  await remove(path.join(rootDir, `${fileName}.md`));

  return true;
};
