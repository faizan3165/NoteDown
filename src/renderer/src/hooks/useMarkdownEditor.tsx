import { useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { throttle } from "lodash";

import { saveNoteAtom, selectedNoteAtom } from "@/store";
import { NoteContent } from "@shared/models";
import { autoSaveTime } from "@shared/constants";

export const useMarkDownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);

  const editorRef = useRef<MDXEditorMethods>(null);

  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return;

      console.log("====================================");
      console.log(`Auto Saving..... ${selectedNote.title}`);
      console.log("====================================");

      await saveNote(content);
    },
    autoSaveTime,
    {
      leading: false,
      trailing: true,
    }
  );

  const handleBlur = async () => {
    if (!selectedNote) return;

    handleAutoSave.cancel();

    const content = editorRef.current?.getMarkdown();

    if (content != null) await saveNote(content);
  };

  return { selectedNote, editorRef, handleAutoSave, handleBlur };
};
