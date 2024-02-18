import { ComponentProps } from "react";
import { LuFileSignature } from "react-icons/lu";
import { useSetAtom } from "jotai";

import { ActionButton } from "@/components";
import { createNoteAtom } from "@renderer/store";

const NewNote = ({ ...props }: ComponentProps<"button">) => {
  const createNote = useSetAtom(createNoteAtom);

  const createNoteHandler = async () => {
    await createNote();
  };

  return (
    <ActionButton onClick={createNoteHandler} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};

export default NewNote;
