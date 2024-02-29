'use client';

import { trpc } from '@/trpc-client/client';
import { useState } from 'react';
import { toast } from 'sonner';

const useCheckUserName = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const { mutateAsync: checkUserName, data } =
    trpc.auth.checkUserName.useMutation();

  const handleCheckUserName = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      clearTimeout(timer);
      const newTimer = setTimeout(async () => {
        await checkUserName(e.target.value);
      }, 500);
      setTimer(newTimer);
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred');
    }
  };

  return { handleCheckUserName, data };
};

export default useCheckUserName;
