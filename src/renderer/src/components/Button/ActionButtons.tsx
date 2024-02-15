import React, { ComponentProps } from "react";

import { NewNote, DeleteNote } from "@/components";

const ActionButtons = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <NewNote />

      <DeleteNote />
    </div>
  );
};

export default ActionButtons;
