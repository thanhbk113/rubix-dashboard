import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { ChangeEvent, FC, useState } from 'react';

import NextImage from '@/components/NextImage';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectValueImage } from '@/features/uploadImage';

interface UploadImageProps {
  images: File[];
  setImage: (images: File[]) => void;
  multiple: boolean;
}

interface ImageItemProps {
  images: File[];
  file: File;
  setImage: (images: File[]) => void;
  idx: number;
}

const ImageItem: FC<ImageItemProps> = (props) => {
  const [ishover, setIshover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const setValueImage = useAppSelector(selectValueImage);

  const isShowUpdateImage = () => {
    setIshover(!ishover);
  };

  const handleDeleteImage = (idx: number) => {
    const newImages = props.images.filter((_, index) => index !== props.idx);
    props.setImage(newImages);
  };
  return (
    <div
      className='relative'
      onMouseEnter={isShowUpdateImage}
      onMouseLeave={isShowUpdateImage}
    >
      <NextImage
        width={300}
        height={300}
        src={URL.createObjectURL(props.file)}
        alt=''
        className='h-full w-full'
      />
      <span
        className='absolute top-0 right-0 z-20 cursor-pointer'
        onClick={() => handleDeleteImage(props.idx)}
      >
        <HighlightOffIcon />
      </span>
      {ishover && (
        <span className='absolute top-1/2 left-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center bg-black opacity-20'>
          <WallpaperIcon className=' text-white' />
        </span>
      )}
    </div>
  );
};

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const urls: File[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        urls.push(files[i]);
      }
    }
    props.setImage(urls);
  };
  return (
    <div className='flex h-full flex-col items-center justify-center gap-2 rounded-xl bg-white p-10 shadow-lg'>
      {props.images.length < 1 && (
        <div className='flex flex-col items-center justify-center gap-2'>
          <input
            title='Upload Image(s)'
            type='file'
            onChange={handleFileUpload}
            className=''
            multiple={props.multiple}
          />
          <WallpaperIcon />
          <h2 className='text-sm text-light-text-primary'>
            PNJ, JPG & GIF ACCEPTED
          </h2>
        </div>
      )}
      <div className='grid w-full grid-cols-4 gap-6'>
        {props.images?.map((file, idx) => (
          <ImageItem
            key={idx}
            file={file}
            idx={idx}
            setImage={props.setImage}
            images={props.images}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
