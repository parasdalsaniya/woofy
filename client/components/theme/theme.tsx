'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const Theme = () => {
  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" flex h-[30px] w-[30px] items-center justify-center rounded-full hover:bg-popover">
      {theme === 'light' ? (
        <Moon size={21} cursor="pointer" onClick={() => setTheme('dark')} />
      ) : (
        <Sun size={21} cursor="pointer" onClick={() => setTheme('light')} />
      )}
    </div>
  );
};

export default Theme;
