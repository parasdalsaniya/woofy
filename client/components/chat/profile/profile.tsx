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

const ProfileModal = () => {
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
              src={'https://avatars.githubusercontent.com/u/101452588?v=4'}
              className="rounded-full"
              alt="profile"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-xl">
            <h2>Reetesh Kumar</h2>
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
