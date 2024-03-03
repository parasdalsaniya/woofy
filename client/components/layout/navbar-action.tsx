'use client';

import { useAppStore } from '@/store/app-state';
import Theme from '../theme/theme';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import AddFriends from '../user-request/user-request';
// import { getLocalData } from '@/utils/utils';

type TNavAction = {
  user: {
    id: string;
    email: string;
    image: string | undefined;
    bio: string | undefined;
    name: string;
    username: string;
  } | null;
};

type TCookies = {
  value: string;
};

const NavbarAction: React.FC<TNavAction & TCookies> = ({ user, value }) => {
  const {
    user: activeUser,
    setUser,
    setCookies,
  } = useAppStore((state) => state);
  // const localUser = getLocalData<boolean>('user');

  useEffect(() => {
    setUser(user);
    setCookies({ value });
  }, [user]);

  return (
    <>
      {activeUser?.id ? (
        <AddFriends />
      ) : (
        <div className="flex items-center justify-between gap-4">
          <Theme />
          <Link href="/login">
            <Button className=" h-8">Login</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavbarAction;
