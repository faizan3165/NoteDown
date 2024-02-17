import { useRef } from "react";

import {
  ActionButtons,
  Content,
  DraggableTopBar,
  Sidebar,
  RootLayout,
  List,
  Markdown,
  NoteTitle,
} from "@/components";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const resetScroll = () => {
    containerRef.current?.scrollTo(0, 0);
  };

  return (
    <>
      <DraggableTopBar />

      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtons className="flex justify-between mt-1" />

          <List className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>

        <Content
          ref={containerRef}
          className="border-l bg-zinc-900/50 border-l-white/20"
        >
          <NoteTitle className="pt-2" />

          <Markdown />
        </Content>
      </RootLayout>
    </>
  );
};

export default App;
