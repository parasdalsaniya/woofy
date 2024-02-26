"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "../ui/card";
import Common from "./common";
import { trpc } from "@/trpc-client/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const common = {
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
};

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" }),
  ...common,
  username: z
    .string()
    .min(3, { message: "Username is too short man" })
    .max(31, { message: "Username is too long" })
    .regex(/^[a-z0-9_-]+$/, { message: "Invalid username" }),
});

export type TUserData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const form = useForm<TUserData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isLoading } = trpc.auth.createAccount.useMutation();
  const router = useRouter();

  const signUpHandler = async (values: TUserData) => {
    try {
      const res = await mutateAsync(values);
      if (res.status) {
        toast.success("Account created successfully");
        return router.push("/login");
      }
      throw new Error("An unknown error occurred");
    } catch (error: any) {
      toast.error(error.message || "An unknown error occurred");
    }
  };
  return (
    <Card className=" w-[95%] md:w-[500px] m-auto">
      <Common title="Create an account" path="login" name="Sign Up" />
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signUpHandler)}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
            <Button className="w-full mt-4">
              {isLoading ? "Loading..." : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
