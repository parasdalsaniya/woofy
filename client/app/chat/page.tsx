import HomeMain from '@/components/chat/home/main';
import Sidebar from '@/components/chat/home/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const Chat = () => {
  return (
    <main className="m-auto mt-20 max-w-[1200px] p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen  rounded-lg border"
      >
        <ResizablePanel defaultSize={30} minSize={22} maxSize={40}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <HomeMain />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default Chat;
