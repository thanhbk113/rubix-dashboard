import { Box, Card, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FC, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import FlexBox from '@/components/Common/FlexBox';
import { H5 } from '@/components/Common/Typography';

import { CmsApi } from '@/api/cms-api';
import { Count } from '@/shared/types/dashboardType';

import AnalyticsPopover from './AnalyticsPopover';

const Analytics: FC = () => {
  const theme = useTheme();

  const [analytics, setAnalytics] = useState<Count>();
  // const [loading, setLoading] = useState(false);

  const getCount = async () => {
    try {
      // setLoading(true);
      const res = await CmsApi.getCount();
      setAnalytics(res.data.data.count);
      // setLoading(false);
    } catch (e) {
      console.log(e);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  const data = {
    series: [
      analytics ? analytics.item_count : 0,
      analytics ? analytics.order_count : 0,
      analytics ? analytics.total_price : 0,
    ],
    categories: ['Người dùng', 'Đơn hàng', 'Doanh thu'],
  };

  const chartOptions: ApexOptions = {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, '#FF9777', '#FF6B93'],
    labels: ['Người dùng', 'Đơn hàng', 'Doanh thu'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { show: false },
          value: { show: false },
        },
        hollow: { size: '28%' },
        track: {
          background: theme.palette.divider,
          margin: 12,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'inherit',
      fontSize: '13px',
      fontWeight: 500,
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: true },
    },
    tooltip: {
      enabled: true,
      style: { fontFamily: 'inherit' },
      y: {
        formatter: (value) => `$${value}`,
      },
    },
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
  };

  const chartSeries = data.series;
  return (
    <Card
      sx={{
        padding: '2rem',
        height: '100%',
        [theme.breakpoints.down(425)]: { padding: '1.5rem' },
      }}
    >
      <FlexBox alignItems='center' justifyContent='space-between'>
        <H5>Thống kê</H5>
        <AnalyticsPopover />
      </FlexBox>

      <Box
        sx={{
          paddingTop: 2,
          '& .apexcharts-tooltip': {
            boxShadow: 'none',
            '& .apexcharts-active': { paddingBottom: 0 },
            '&.apexcharts-theme-light': {
              border: 'none',
              color: 'white',
              borderRadius: '8px',
            },
          },
          '& .apexcharts-legend.position-bottom.apexcharts-align-center, .apexcharts-legend.position-top.apexcharts-align-center':
            { justifyContent: 'space-evenly' },
          [theme.breakpoints.down(425)]: { padding: 0 },
        }}
      >
        <Chart
          options={chartOptions}
          series={chartSeries}
          type='radialBar'
          height={300}
        />
      </Box>
    </Card>
  );
};

export default Analytics;
