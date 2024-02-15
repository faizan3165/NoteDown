import { ComponentProps } from "react";

import { Preview } from "@/components";

import { dummyNotes } from "@renderer/store/mocks";
import { twMerge } from "tailwind-merge";

const List = ({ className, ...props }: ComponentProps<"ul">) => {
  if (dummyNotes.length === 0) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Notes Yet...</span>
      </ul>
    );
  }

  return (
    <ul {...props}>
      {dummyNotes?.map((note) => (
        <Preview key={`${note.title} ${note.editedAt}`} {...note} />
      ))}
    </ul>
  );
};

export default List;
