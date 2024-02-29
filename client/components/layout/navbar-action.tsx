'use client';

import { useAppStore } from '@/store/app-state';
import Theme from '../theme/theme';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect } from 'react';
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

const NavbarAction: React.FC<TNavAction> = ({ user }) => {
  const { user: activeUser, setUser } = useAppStore((state) => state);
  // const localUser = getLocalData<boolean>('user');

  useEffect(() => {
    setUser(user);
  }, [user]);

  if (activeUser?.id) return null;

  return (
    <div className="flex items-center justify-between gap-4">
      <Theme />
      <Link href="/login">
        <Button className=" h-8">Login</Button>
      </Link>
    </div>
  );
};

export default NavbarAction;
