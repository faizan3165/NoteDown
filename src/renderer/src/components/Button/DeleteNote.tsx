import { ComponentProps } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSetAtom } from "jotai";

import { ActionButton } from "@/components";
import { deleteNoteAtom } from "@renderer/store";

const DeleteNote = ({ ...props }: ComponentProps<"button">) => {
  const deleteNote = useSetAtom(deleteNoteAtom);

  const deleteNoteHandler = async () => {
    await deleteNote();
  };

  return (
    <ActionButton onClick={deleteNoteHandler} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};

export default DeleteNote;
