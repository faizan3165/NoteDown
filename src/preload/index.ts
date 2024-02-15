import { contextBridge } from "electron";

if (!process.contextIsolated) {
  throw new Error("Context Isolation should be enabled");
}
try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
  });
} catch (error: any) {
  throw new Error(error.message);
}
