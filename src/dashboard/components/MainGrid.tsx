import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { fetchData } from '../../api.ts';
import Typography from '@mui/material/Typography';
import PageViewsBarChart from './PageViewsBarChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import { PieChart } from '@mui/x-charts/PieChart';

const data: StatCardProps[] = [
  {
    title: 'Production per hour',
    value: '14V',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: '% Down time',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Cost per hour',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid() {
  
  const [maxEnergy, setMaxEnergy] = useState<{ MaxEnergy?: number }>({});
  const [sources, setSources] = useState<{ Sources?: string }>({ });
  const [sourceVals, setSourceVals] = useState<{ SourceVals?: number }>({ });
  

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const maxEnergy = await fetchData('/max-energy');
        console.log('Fetched data:', maxEnergy); 
        setMaxEnergy(maxEnergy);

        const sources = await fetchData('/energy-sources-general');
        console.log('fetched data:', sources);
        setSources({Sources: sources[0][0]});
        setSourceVals({SourceVals: sources[0][1]});

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();
  }, []);
  
  
  
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Gauge
            value={Math.round((maxEnergy.MaxEnergy ?? 0) * 100)}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: 'translate(0px, 0px)',
              },
            }}
            text={({ value }) => `${value}%`}
          />
        </Grid>
        <Grid size={{ xs: 10, sm: 8, lg: 4 }}>
            <Box sx={{ p: 7, textAlign: 'center', border: '1px solid', borderColor: 'grey.700', borderRadius: 2 }}>
              <PieChart
              series={[
              {
              data: [
              { id: 0, value: (sourceVals.SourceVals ?? 1), label: (sources.Sources ?? "") },
              ],
              },
              ]}
              width={400}
              height={200}
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Energy Sources
              </Typography>
            </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
    </Box>
  );
}