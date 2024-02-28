import { Skeleton } from '@/components/ui/skeleton';

const UserChat = () => {
  return (
    <div className="flex items-start gap-2 py-2">
      <Skeleton className="h-[55px] w-[55px] rounded-full" />
      <div className=" mt-2 flex w-[70%] flex-col gap-2">
        <Skeleton className="h-4 w-[80%] text-accent" />
        <Skeleton className="h-4 w-[60%] bg-accent" />
      </div>
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <section className="mt-3 flex flex-col gap-2">
      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />
    </section>
  );
};
