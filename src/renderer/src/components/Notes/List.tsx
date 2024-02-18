import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { isEmpty } from "lodash";

import { Preview } from "@/components";

import { useNotesList } from "@renderer/hooks/useNotesList";

type ListProps = ComponentProps<"ul"> & {
  onSelect: () => void;
};

const List = ({ className, onSelect, ...props }: ListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({
    onSelect,
  });

  return isEmpty(notes) ? (
    <ul className={twMerge("text-center pt-4", className)} {...props}>
      <span>No Notes Yet...</span>
    </ul>
  ) : (
    <ul className={className} {...props}>
      {notes?.map((note, index) => (
        <Preview
          key={index}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  );
};

export default List;
