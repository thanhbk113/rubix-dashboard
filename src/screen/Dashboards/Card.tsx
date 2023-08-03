import { alpha, Box, Card, styled } from '@mui/material';
import { FC } from 'react';

import { H3, H5 } from '@/components/Common/Typography';

// root component interface
interface SaaSCardProps {
  card: {
    price: number | undefined;
    Icon: any;
    title: string;
    color: string;
  };
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: '2rem 1.5rem',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: '1.5rem',
    flexDirection: 'column',
    justifyContent: 'center',
    '& .MuiBox-root': {
      marginRight: 0,
      textAlign: 'center',
    },
  },
}));

const SaaSCard: FC<SaaSCardProps> = ({ card }) => {
  const { Icon, title, color, price } = card;

  return (
    <StyledCard>
      <Box
        sx={{
          width: 60,
          height: 60,
          marginRight: 2,
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(color, 0.2),
        }}
      >
        <Icon sx={{ color }} />
      </Box>
      <Box mt={{ xs: '1rem', sm: 0 }}>
        <H5 color='text.disabled'>{title}</H5>
        {title === 'Tổng doanh thu' ? <H3>{price}.000 đ</H3> : <H3>{price}</H3>}
      </Box>
    </StyledCard>
  );
};

export default SaaSCard;
