import React from "react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

type TCommon = {
  title: string;
  path: "login" | "signup";
  name: "Login" | "Sign Up";
};

const Common: React.FC<TCommon> = ({ title, path, name }) => {
  return (
    <CardHeader className="space-y-1">
      <div className=" flex items-center justify-between">
        <CardTitle className="text-2xl">{title}</CardTitle>

        <Link href={`/${path}`}>
          <span className=" hover:underline underline-offset-4">{name}</span>
        </Link>
      </div>
      <CardDescription>Woofy let&apos;s you feel wooofy!</CardDescription>
    </CardHeader>
  );
};

export default Common;
