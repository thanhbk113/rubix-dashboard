import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { useEffect, useState } from 'react';

import NextImage from '@/components/NextImage';

const UploadImage = () => {
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);
  const handleFileUpload = (e: any) => {
    const files = e.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }

    setImage(urls);
  };
  return (
    <div className='flex h-full flex-col items-center justify-center gap-2 rounded-xl bg-white p-10 shadow-lg'>
      {image === null && (
        <div className='flex flex-col items-center justify-center gap-2'>
          <input
            title='Upload Image(s)'
            type='file'
            onChange={handleFileUpload}
            className=''
            multiple
          />
          <WallpaperIcon />
          <h2 className='text-sm text-light-text-primary'>
            PNJ, JPG & GIF ACCEPTED
          </h2>
        </div>
      )}
      <div className='grid w-full grid-cols-4 gap-6'>
        {image?.map((url: any) => (
          <div key={url}>
            <NextImage
              width={300}
              height={300}
              src={url}
              alt=''
              className='h-full w-full'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
