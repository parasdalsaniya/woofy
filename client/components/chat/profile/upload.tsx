import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type TUpload = {
  image: string | null;
  onChangeFile: (e: string) => void;
};

const Upload: React.FC<TUpload> = ({ image, onChangeFile }) => {
  return (
    <div className="flex w-full items-center justify-center">
      {!image ? (
        <label
          htmlFor="dropzone-file"
          className="flex h-[130x] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary bg-background"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG Supported
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e: any) => {
              if (e.target.files && e.target.files[0]) {
                onChangeFile(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
      ) : (
        <div className=" relative flex w-full items-center justify-center">
          <Image
            src={image}
            alt="upload"
            width={132}
            height={132}
            className="h-[132px] w-[132px]  rounded-lg bg-background"
          />
          <Trash2
            className=" z-2 absolute bottom-2 right-2 cursor-pointer text-primary "
            onClick={() => onChangeFile('')}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;
