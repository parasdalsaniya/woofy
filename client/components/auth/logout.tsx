'use client';

import Link from 'next/link';
import Theme from '../theme/theme';
import { Button } from '../ui/button';
import { trpc } from '@/trpc-client/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppStore } from '@/store/app-state';
import React, { useEffect } from 'react';

type TLogout = {
  user: {
    id: string;
    email: string;
  } | null;
};

const Logout: React.FC<TLogout> = ({ user }) => {
  const { mutateAsync } = trpc.auth.logout.useMutation();
  const router = useRouter();
  const { setUser, user: activeUser } = useAppStore((state) => state);

  const handleLogout = async () => {
    try {
      await mutateAsync();
      setUser(null);
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred');
    }
  };

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div className="flex items-center justify-between gap-4">
      <Theme />

      {activeUser?.id ? (
        <Button onClick={handleLogout} className=" h-8">
          Logout
        </Button>
      ) : (
        <Link href="/login">
          <Button className=" h-8">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Logout;
