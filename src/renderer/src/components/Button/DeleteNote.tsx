import { ComponentProps } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import { ActionButton } from "@/components";

const DeleteNote = ({ ...props }: ComponentProps<"button">) => {
  return (
    <ActionButton {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};

export default DeleteNote;
