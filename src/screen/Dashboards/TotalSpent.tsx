import { Box, Card, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FC, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { H2, H5 } from '@/components/Common/Typography';

import { CmsApi } from '@/api/cms-api';
import { Count } from '@/shared/types/dashboardType';

const TotalSpent: FC = () => {
  const theme = useTheme();

  const [totalSpentMonth, setTotalSpentMonth] = useState<number[]>([]);
  const [totalSpent, setTotalSpent] = useState<Count | undefined>();
  // const [loading, setLoading] = useState(false);

  const getCount = async () => {
    try {
      // setLoading(true);
      const res = await CmsApi.getCount();
      setTotalSpent(res.data.data.count);
      const data = res.data.data.total_spent;
      setTotalSpentMonth(Object.values(data));
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
      {
        name: 'Spent',
        data: totalSpentMonth,
      },
    ],
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: { show: false },
    },
    colors: [theme.palette.primary.main],
    dataLabels: { enabled: false },
    // fill: { opacity: 1 },
    grid: {
      show: false,
    },
    states: {
      active: {
        filter: { type: 'none' },
      },
      hover: {
        filter: { type: 'none' },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: data.categories,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
        },
      },
    },
    yaxis: { show: false },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        rangeBarOverlap: false,
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val: number) => `$${val}`,
      },
    },

    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            labels: { show: false },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
            },
          },
        },
      },
    ],
  };

  const chartSeries = data.series;

  return (
    <Card
      sx={{
        paddingX: 4,
        height: '100%',
        paddingBottom: '1.5rem',
        paddingTop: 'calc(1.5rem + 15px)',
        [theme.breakpoints.down(425)]: { padding: '1.5rem' },
      }}
    >
      <H5>Tổng doanh thu</H5>
      <H2 color='primary.main'>{totalSpent?.total_price} đ</H2>

      <Box
        sx={{
          '& .apexcharts-tooltip *': {
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
          },
          '& .apexcharts-tooltip': {
            boxShadow: 0,
            borderRadius: 4,
            alignItems: 'center',
            '& .apexcharts-tooltip-text-y-value': { color: 'primary.main' },
            '& .apexcharts-tooltip.apexcharts-theme-light': {
              border: `1px solid ${theme.palette.divider}`,
            },
            '& .apexcharts-tooltip-series-group:last-child': {
              paddingBottom: 0,
            },
          },
        }}
      >
        <Chart
          height={245}
          options={chartOptions}
          series={chartSeries}
          type='bar'
        />
      </Box>
    </Card>
  );
};

export default TotalSpent;
