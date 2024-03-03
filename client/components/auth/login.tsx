'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '../ui/card';
import Common from './common';
import { common } from './signup';
import { trpc } from '@/trpc-client/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/app-state';

export const loginSchema = z.object({
  ...common,
});

export type TFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<TFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isLoading } = trpc.auth.login.useMutation();
  const router = useRouter();
  const { setCookies, setUser } = useAppStore((state) => state);

  const loginHandler = async (values: TFormData) => {
    try {
      const rest = await mutateAsync(values);
      if (rest.status) {
        setUser(rest.data);
        setCookies({ value: rest.cookies.value });
        localStorage.setItem('user', JSON.stringify(true));
        return router.push('/chat');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred');
    }
  };
  return (
    <Card className=" m-auto w-[95%] md:w-[500px]">
      <Common title="Login to your Account" path="signup" name="Sign Up" />
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(loginHandler)}
            className=" grid gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 w-full">
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
