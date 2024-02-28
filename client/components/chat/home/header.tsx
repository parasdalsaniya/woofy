'use client';

import { ChatSkeleton } from '@/components/skeleton/skeleton';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/app-state';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import ProfileModal from '../profile/profile';

const chatUsers = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://avatars.githubusercontent.com/u/101452588?v=4',
  },
  {
    id: 2,
    name: 'Jane Clarke',
    image: 'https://avatars.githubusercontent.com/u/101452588?v=4',
  },
  {
    id: 3,
    name: 'Stuart Clarke',
    image: 'https://avatars.githubusercontent.com/u/101452588?v=4',
  },
];

const Header = () => {
  const { users, setUsers } = useAppStore((state) => state);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const filteredUsers = chatUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    }, 500);
    setTimer(newTimer);
  };

  useEffect(() => {
    setUsers(chatUsers);
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center gap-4">
        <ProfileModal />

        <div className=" w-full">
          <Input
            placeholder="Search contacts"
            className=" w-[97%]"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div>
        {users.length > 0 ? (
          <ul className=" mt-3 flex flex-col gap-2 ">
            {users.map((user) => (
              <li
                key={user.id}
                className=" flex cursor-pointer items-start gap-4 rounded border bg-accent p-2 hover:bg-popover"
              >
                <Image
                  src={user.image}
                  alt={user.name}
                  width={50}
                  height={50}
                  className=" rounded-full"
                />
                <div className=" flex flex-col">
                  <b className=" text-base capitalize">{user.name}</b>
                  <span className=" text-[14px]">
                    well man we gonna make it
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ChatSkeleton />
        )}
      </div>
    </section>
  );
};

export default Header;
