import {
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ScrollBar from 'simplebar-react';

import { H5, Small } from '@/components/Common/Typography';

import { CmsApi } from '@/api/cms-api';
import { UserMostSpent } from '@/shared/types/dashboardType';

const commonCSS = {
  minWidth: 120,
  '&:nth-of-type(2)': { minWidth: 170 },
  '&:nth-of-type(3)': { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  '&:first-of-type': { paddingLeft: 0 },
  '&:last-of-type': { paddingRight: 0 },
}));

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 0,
  paddingLeft: '1rem',
  paddingTop: '0.7rem',
  '&:first-of-type': { paddingLeft: 0 },
  '&:last-of-type': { paddingRight: 0 },
  [theme.breakpoints.down('sm')]: { ...commonCSS },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));

const RecentOrders: FC = () => {
  const [userMostSpent, setUserMostSpent] = useState<UserMostSpent[]>([]);
  const [loading, setLoading] = useState(false);

  const getCount = async () => {
    try {
      setLoading(true);
      const res = await CmsApi.getCount();
      setUserMostSpent(res.data.data.fiveMostSpentUsers);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <Card sx={{ padding: '2rem' }}>
      <H5 className='pb-2'>Người dùng hàng đầu</H5>
      <hr />

      <ScrollBar>
        <Table>
          <TableHead
            sx={{ borderBottom: '1.5px solid', borderColor: 'divider' }}
          >
            <TableRow>
              <HeadTableCell>Top</HeadTableCell>
              <HeadTableCell>Tên Người Dùng</HeadTableCell>
              <HeadTableCell>Tổng tiền</HeadTableCell>
              <HeadTableCell>Email</HeadTableCell>
              {/* <HeadTableCell>Total amount</HeadTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {userMostSpent.map((item, index) => (
              <TableRow key={index}>
                <BodyTableCell>{index + 1}</BodyTableCell>
                <BodyTableCell>
                  <Small ml='1rem'>{item.username}</Small>
                </BodyTableCell>
                <BodyTableCell>{item.total_spent} đ</BodyTableCell>
                <BodyTableCell>{item.email}</BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollBar>
    </Card>
  );
};

export default RecentOrders;
