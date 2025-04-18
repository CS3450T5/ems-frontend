import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { fetchData } from '../../api';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}


export default function SessionsChart() {
  const theme = useTheme();

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const [totalUsage, setTotalUsage] = useState<string>('');
  const [energyPerDay, setEnergyPerDay] = useState<(number | null)[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const firstDay = await fetchData('/total-usage/1743832800/1743919199');
        const secondDay = await fetchData('/total-usage/1743919200/1744005599');
        const thirdDay = await fetchData('/total-usage/1744005600/1744091999');
        const fourthDay = await fetchData('/total-usage/1744092000/1744178399');
        const fifthDay = await fetchData('/total-usage/1744178400/1744264799');
        setTotalUsage(firstDay.voltage_total+secondDay.voltage_total+thirdDay.voltage_total+fourthDay.voltage_total+fifthDay.voltage_total);
        setEnergyPerDay([
          firstDay.voltage_total || null,
          secondDay.voltage_total || null,
          thirdDay.voltage_total || null,
          fourthDay.voltage_total || null,
          fifthDay.voltage_total || null,
        ]);
      } catch (error) {
      }
    };
    fetchDataFromAPI();
  }, []);


  

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Energy Usage
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
                {totalUsage ? `${totalUsage}V` : 'Loading...'}
            </Typography>
            
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Total voltage use per day
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: ['Apr 5', 'Apr 6', 'Apr 7', 'Apr 8', 'Apr 9'],
              tickInterval: (i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'voltage',
              label: 'Voltage',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: false,
              stackOrder: 'ascending',
              data: energyPerDay,
            },
           
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')",
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')",
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.light} id="voltage" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
