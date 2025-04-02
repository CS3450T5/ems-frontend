import React, { useEffect, useState } from 'react';
import { fetchData } from '../api.ts';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  // Declare api states here
  const [totalUsage, setTotalUsage] = useState<{ voltage_total?: number }>({});

  // Fetch data from the API
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchData('/total-usage/1735689600/1743552830');
        console.log('Fetched data:', data); // Debug the response
        setTotalUsage(data); // Update the state with the entire response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();
  }, []);
  
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppNavbar />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <SideMenu />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'hidden', // Prevent horizontal overflow
              display: 'flex',
              flexDirection: 'column',
              width: '100%', // Ensure the Box takes full width
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                px: 3, // Change mx to px to avoid horizontal overflow
                pb: 5,
                mt: 0,
                flexGrow: 1,
                width: '100%', // Ensure the Stack takes full width
              }}
            >
              <Header />
              <MainGrid />
              {/* Display total voltage */}
              <p>{totalUsage.voltage_total ?? 'Loading...'}</p>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}