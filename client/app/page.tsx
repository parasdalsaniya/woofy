import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logout } from "@/components/auth/logout";
import { Form } from "@/components/common/form";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <>
      <h1>Hi, {user.email}!</h1>
      <p>Your user ID is {JSON.parse(JSON.stringify(user.id))}</p>
      <Form action={logout}>
        <button>Sign out</button>
      </Form>
    </>
  );
}
