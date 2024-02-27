'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const Theme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className=" flex h-[30px] w-[30px] items-center justify-center rounded-full hover:bg-popover">
      {theme === 'light' ? (
        <Sun size={21} cursor="pointer" onClick={() => setTheme('dark')} />
      ) : (
        <Moon size={21} cursor="pointer" onClick={() => setTheme('light')} />
      )}
    </div>
  );
};

export default Theme;
