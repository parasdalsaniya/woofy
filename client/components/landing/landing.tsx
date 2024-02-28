import Image from 'next/image';
import landingImage from '../../public/landing.svg';

const Landing = () => {
  return (
    <section className=" m-auto max-w-[1200px] px-4 md:px-0">
      <div className=" mt-24 flex flex-col items-center justify-center">
        <h1 className=" text-2xl">Welcome to Woofy</h1>
        <p className=" mt-2 text-center">
          Woofy built for those who want to respect their privacy and Chat with
          their friends and family.
        </p>
      </div>

      <div className=" mt-4 h-[360px] w-full md:mt-14">
        <Image
          src={landingImage}
          width={0}
          height={0}
          alt="landing image"
          className=" h-full w-full"
        />
      </div>

      <footer className="mt-6 w-full md:mt-10">
        <p className="text-center">
          &copy; 2024 Woofy, Inc. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default Landing;
