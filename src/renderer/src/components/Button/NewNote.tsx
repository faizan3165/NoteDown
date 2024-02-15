import { ComponentProps } from "react";
import { LuFileSignature } from "react-icons/lu";

import { ActionButton } from "@/components";

const NewNote = ({ ...props }: ComponentProps<"button">) => {
  return (
    <ActionButton {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};

export default NewNote;
