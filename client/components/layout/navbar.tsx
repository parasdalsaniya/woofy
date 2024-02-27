import Link from 'next/link';
import Logout from '../auth/logout';
import { validateRequest } from '@/lib/auth';

const Navbar = async () => {
  const { user } = await validateRequest();
  return (
    <nav className="fixed left-1/2 top-10 z-[20] m-auto flex w-[95%] -translate-x-1/2 -translate-y-1/2 transform  items-center justify-between rounded-[30px] bg-muted px-4 py-2 md:w-[80%]">
      <div>
        <Link href="/">
          <h1 className="cursor-pointer font-mono text-2xl">Woofy</h1>
        </Link>
      </div>

      <Logout user={{ id: user?.id?.toString() || '', email: user?.email }} />
    </nav>
  );
};

export default Navbar;
