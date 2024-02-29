'use client';

import Logout from '@/components/auth/logout';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import EditProfile from './edit-profile';

const Tabs = () => {
  const { theme, setTheme } = useTheme();
  return (
    <section className=" mt-8">
      <ul>
        <EditProfile />
        <Separator className=" my-1" />
        <li className="flex cursor-pointer items-center justify-between gap-3 rounded p-2 hover:bg-accent">
          {theme === 'light' ? (
            <div className=" flex items-center gap-3">
              <Moon />
              <b>Dark Mode</b>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Sun />
              <b>Light Mode</b>
            </div>
          )}

          <Switch
            checked={theme === 'light' ? false : true}
            onCheckedChange={() => {
              theme === 'light' ? setTheme('dark') : setTheme('light');
            }}
          />
        </li>
        <Separator className=" my-1" />
        <Logout />
        <Separator className=" my-1" />
      </ul>
    </section>
  );
};

export default Tabs;
