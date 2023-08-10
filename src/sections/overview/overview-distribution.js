import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';

const useChartOptions = (labels, selectCategory) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      events: {
        dataPointSelection: (event, chartContext, payload) => { 
          selectCategory(labels[payload.dataPointIndex])
        }
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: true
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

export const OverviewDistribution = (props) => {
  const { positionSeries, sx, selectCategory } = props;
  const chartOptions = useChartOptions(positionSeries.map((position) => position.itemName), selectCategory);

  return (
    <Card sx={sx}>
      <CardHeader title="Posições" />
      <CardContent>
        <Chart
          height={300}
          
          options={chartOptions}
          series={positionSeries.map((position) => position.percentage)}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {positionSeries.map((position, index) => {
            return (
              <Box
                key={position.itemName}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{ my: 1 }}
                  variant="h6"
                >
                  {position.itemName}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  {position.percentage}%
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewDistribution.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
  selectCategory: PropTypes.func,
};
