import { selectedNoteAtom } from "@renderer/store";
import { useAtomValue } from "jotai";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const NoteTitle = ({ className, ...props }: ComponentProps<"div">) => {
  const selectedNote = useAtomValue(selectedNoteAtom);

  return (
    <div className={twMerge("flex justify-center", className)} {...props}>
      <span className="text-gray-400">{selectedNote?.title}</span>
    </div>
  );
};

export default NoteTitle;
