import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User } from 'lucide-react';
import { useState } from 'react';
import Upload from './upload';

const EditProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className=" flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-accent">
          <User />
          <b>Edit Profile</b>
        </li>
      </DialogTrigger>
      <DialogContent className=" w-[95%] md:max-w-[500px]">
        <div className=" px-4">
          <Upload image={image} onChangeFile={(e: string) => setImage(e)} />
        </div>
        <DialogFooter>
          <span className=" inline-block w-full rounded-b-[5px] rounded-t-none p-2 hover:bg-accent">
            Close
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
