import { contextBridge, ipcRenderer } from "electron";

import { GetNotes } from "@shared/types";

if (!process.contextIsolated) {
  throw new Error("Context Isolation should be enabled");
}
try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,

    getNotes: (...args: Parameters<GetNotes>) =>
      ipcRenderer.invoke("getNotes", ...args),
  });
} catch (error: any) {
  throw new Error(error.message);
}
