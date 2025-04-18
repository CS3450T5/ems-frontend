import { useEffect, useState } from 'react';
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
              overflow: 'visible',
              width: '100%',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                px: 3,
                pb: 5,
                mt: 0,
                flexGrow: 1,
                width: '100%'
              }}
            >
              <Header />
              <MainGrid />
              
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}