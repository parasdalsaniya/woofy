import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Tabs from './tabs';
import { useAppStore } from '@/store/app-state';

const ProfileModal = () => {
  const user = useAppStore((s) => s.user);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className=" bg-primary-100 mt-4 flex w-full items-center justify-center p-4">
            <Image
              width={100}
              height={100}
              src={
                user?.image ||
                'https://res.cloudinary.com/dw6wav4jg/image/upload/v1709318757/user_lsxclk.png'
              }
              className="h-[100px] w-[100px] rounded-full bg-accent"
              alt="profile"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-xl">
            <h2>{user?.name}</h2>
          </div>
        </SheetHeader>
        <div>
          <Tabs />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileModal;
