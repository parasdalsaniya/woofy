'use client';

import { trpc } from '@/trpc-client/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppStore } from '@/store/app-state';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const { mutateAsync } = trpc.auth.logout.useMutation();
  const router = useRouter();
  const { setUser } = useAppStore((state) => state);

  const handleLogout = async () => {
    try {
      await mutateAsync();
      router.push('/login');
      setUser(null);
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred');
    }
  };

  return (
    <li
      className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-accent"
      onClick={handleLogout}
    >
      <LogOut />
      <b>Logout</b>
    </li>
  );
};

export default Logout;
