import SignUp from '@/components/auth/signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup | Woofy',
  description: 'A Chat App for hardcore chat lovers. 🚀',
};

const SignUpPage = () => {
  return (
    <main className=" flex h-screen items-center justify-center">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
