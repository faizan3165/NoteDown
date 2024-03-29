import { contextBridge, ipcRenderer } from "electron";

import {
  GetNotes,
  ReadNote,
  WriteNote,
  CreateNote,
  DeleteNote,
} from "@shared/types";

if (!process.contextIsolated) {
  throw new Error("Context Isolation should be enabled");
}
try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,

    getNotes: (...args: Parameters<GetNotes>) =>
      ipcRenderer.invoke("getNotes", ...args),

    readNote: (...args: Parameters<ReadNote>) =>
      ipcRenderer.invoke("readNote", ...args),

    writeNote: (...args: Parameters<WriteNote>) =>
      ipcRenderer.invoke("writeNote", ...args),

    createNote: (...args: Parameters<CreateNote>) =>
      ipcRenderer.invoke("createNote", ...args),

    deleteNote: (...args: Parameters<DeleteNote>) =>
      ipcRenderer.invoke("deleteNote", ...args),
  });
} catch (error: any) {
  throw new Error(error.message);
}
