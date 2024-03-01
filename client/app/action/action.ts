'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.IMAGE_API_KEY,
  api_secret: process.env.IMAGE_API_SECRET,
  secure: true,
});

export const uploadFile = async (e: FormData) => {
  try {
    e.append('upload_preset', process.env.CLOUD_PRESET!);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: e,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteFiles = async (imageUrls: string[]) => {
  try {
    for (const imageUrl of imageUrls) {
      const publicId = imageUrl!.split('/')!.pop()!.split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    return true;
  } catch (error) {
    throw error;
  }
};
