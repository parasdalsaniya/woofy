'use client';

import React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '../ui/button';
import { trpc } from '@/trpc-client/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Spinner from '../ui/spinner';
import { useAppStore } from '@/store/app-state';
import { toast } from 'sonner';

const AddFriends = () => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  const user = useAppStore((state) => state.user);
  const { isLoading, data, refetch } = trpc.user.getAllUser.useQuery();
  const { mutateAsync, isLoading: isPending } =
    trpc.userFriend.sendChatRequest.useMutation();

  const handleSendRequest = async ({
    receiverId,
    receiverName,
  }: {
    receiverId: string;
    receiverName: string;
  }) => {
    if (isPending) return;
    setSelected(receiverId);
    if (!user) return;

    try {
      await mutateAsync({
        userId: user.id,
        receiverId,
        receiverName,
      });
      setSelected(null);
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to send request');
    }
  };

  return (
    <React.Fragment>
      <Button className=" h-8" onClick={() => setOpen(true)}>
        Add Friends
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search users..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {isLoading ? (
            <div className=" flex h-[100px] w-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <CommandGroup heading="Users">
              <div className=" flex flex-col gap-1">
                {data?.data?.map((user) => (
                  <React.Fragment key={user._id}>
                    <CommandItem
                      className=" border bg-transparent"
                      onSelect={() => {
                        if (user.isFriend) return;
                        handleSendRequest({
                          receiverId: user._id,
                          receiverName: user.name,
                        });
                      }}
                    >
                      <div className=" flex w-full items-center justify-between gap-3">
                        <div className=" flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className=" bg-primary">
                              {user.name.slice(0, 3)}
                            </AvatarFallback>
                          </Avatar>

                          <div className=" flex flex-col">
                            <b className=" capitalize">{user.name}</b>
                            <span className=" text-xs">@{user.username}</span>
                          </div>
                        </div>

                        {!user.isFriend && (
                          <Button className=" h-8">
                            {isPending && selected === user._id ? (
                              <Spinner />
                            ) : (
                              'Add'
                            )}
                          </Button>
                        )}
                      </div>
                    </CommandItem>
                  </React.Fragment>
                ))}
              </div>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  );
};

export default AddFriends;
