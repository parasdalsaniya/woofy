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
import z from 'zod';
import { commonTwo } from '@/components/auth/signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useCheckUserName from '@/hooks/useCheckUserName';
import { useAppStore } from '@/store/app-state';
import { toast } from 'sonner';
import { trpc } from '@/trpc-client/client';
import { uploadFile, deleteFiles } from '@/app/action/action';

type TUserData = {
  username: string;
  name: string;
  bio: string;
};

const schema = z.object({
  ...commonTwo,
  bio: z.string().max(160, { message: 'Bio is too long' }).optional(),
});

const EditProfile = () => {
  const { user, setUser } = useAppStore((s) => s);
  const [image, setImage] = useState<string | null>(user?.image || null);
  const [uploadNewImage, setUploadNewImage] = useState<File | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);
  const { handleCheckUserName, data } = useCheckUserName();

  const { mutateAsync, isLoading } = trpc.user.updateUser.useMutation();
  const form = useForm<TUserData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user?.username || '',
      name: user?.name || '',
      bio: user?.bio || '',
    },
  });

  const handleUpdateProfile = async (data: TUserData) => {
    try {
      if (!user) return toast.error('User not found');

      let newImage = { secure_url: '' };
      if (uploadNewImage) {
        const formData = new FormData();
        formData.append('file', uploadNewImage);
        newImage = await uploadFile(formData);
      }

      const res = await mutateAsync({
        ...data,
        id: user?.id?.toString(),
        image: newImage.secure_url || image || undefined,
      });
      setUser({ ...res.data, id: user.id });
      setOpen(false);
      setUploadNewImage(undefined);
      setImage(null);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <li className=" flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-accent">
          <User />
          <b>Edit Profile</b>
        </li>
      </DialogTrigger>
      <DialogContent className=" w-[95%] md:max-w-[500px]">
        <div className=" px-4">
          <Upload
            image={image}
            onChangeFile={(e: string) => setImage(e)}
            onChange={(e) => setUploadNewImage(e.target.files?.[0])}
            onDelete={(e) => {
              if (e.includes('https://res.cloudinary.com')) {
                setImage(null);
                deleteFiles([e]);
              }
            }}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateProfile)}
              className=" grid gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field: { value, onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...rest}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          handleCheckUserName(e);
                        }}
                      />
                    </FormControl>
                    {data ? (
                      <span className=" mt-3 inline-block text-[14px] text-red-900 ">
                        Username is already taken
                      </span>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter bio" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4 w-full">
                {isLoading ? 'Loading...' : 'Update Profile'}
              </Button>
            </form>
          </Form>
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
