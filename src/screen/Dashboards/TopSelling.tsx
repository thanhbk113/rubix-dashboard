import { Box, Card, Rating } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import FlexBox from '@/components/Common/FlexBox';
import { H5, Small } from '@/components/Common/Typography';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import { Product } from '@/shared/types/itemType';

const TopSelling: FC = () => {
  const [productBestSelling, setProductBestSelling] = useState<Product[]>([]);

  const getListItem = async () => {
    try {
      const res = await CmsApi.getListItems({ take: 4 });
      setProductBestSelling(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListItem();
  }, []);

  return (
    <Card sx={{ padding: '2rem' }}>
      <H5>Top Selling Products</H5>

      {productBestSelling.map((product, index) => (
        <FlexBox key={index} mt='1.2rem'>
          <NextImage
            src={product.images[0]}
            alt='Men Keds'
            width={90}
            height={90}
          />

          <Box display='flex' flexDirection='column' ml='1rem'>
            <Small>{product.name}</Small>
            <Rating
              name='read-only'
              size='small'
              defaultValue={product.price}
              readOnly
              sx={{ my: '3px' }}
            />
            <Small fontWeight={600}>${product.price}</Small>
          </Box>
        </FlexBox>
      ))}
    </Card>
  );
};

export default TopSelling;
