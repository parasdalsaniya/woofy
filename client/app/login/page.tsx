import Login from '@/components/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Woofy',
  description: 'A Chat App for hardcore chat lovers. 🚀',
};

const LoginPage = () => {
  return (
    <main className=" flex h-screen items-center justify-center">
      <Login />
    </main>
  );
};

export default LoginPage;
